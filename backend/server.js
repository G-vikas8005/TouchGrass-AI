const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const systemPrompt = `You are TouchGrass AI.

Create ONE realistic outdoor activity based on the user's:
- available time
- mood
- energy level
- environment

Rules:
- Must fit within the available time.
- Must cost nothing.
- Require little or no equipment.
- Must be realistic for an ordinary person.
- Encourage movement, observation, nature, exploration, relaxation, or social interaction.
- Must be safe and beginner-friendly.
- The user should not need to continuously use their phone.
- The phone should only be needed to start the activity.

Return ONLY a valid JSON object.
Do NOT use markdown.
Do NOT use code fences.
Do NOT add explanations before or after the JSON.

Use exactly these fields:

{
  "title": "short activity title",
  "description": "one short description",
  "steps": [
    "step 1",
    "step 2",
    "step 3",
    "step 4"
  ],
  "mission": "one fun outdoor challenge",
  "screenRule": "one simple rule for putting the phone away",
  "safetyNote": "short safety reminder"
}`;

function extractJson(content) {
  if (!content) {
    throw new Error('Empty response from model.');
  }

  let cleaned = String(content).trim();

  // Remove markdown code fences if the model adds them.
  cleaned = cleaned
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();

  // First attempt: parse the entire response.
  try {
    return JSON.parse(cleaned);
  } catch (firstError) {
    // Try extracting the JSON object from surrounding text.
    const start = cleaned.indexOf('{');
    const end = cleaned.lastIndexOf('}');

    if (start !== -1 && end !== -1 && end > start) {
      const jsonPart = cleaned.slice(start, end + 1);

      try {
        return JSON.parse(jsonPart);
      } catch (secondError) {
        throw new Error(
          `Model returned invalid JSON: ${cleaned.slice(0, 500)}`
        );
      }
    }

    throw new Error(
      `Model did not return JSON: ${cleaned.slice(0, 500)}`
    );
  }
}

function validateMission(mission) {
  if (!mission || typeof mission !== 'object') {
    return false;
  }

  if (typeof mission.title !== 'string') return false;
  if (typeof mission.description !== 'string') return false;
  if (!Array.isArray(mission.steps)) return false;
  if (mission.steps.length === 0) return false;
  if (typeof mission.mission !== 'string') return false;
  if (typeof mission.screenRule !== 'string') return false;
  if (typeof mission.safetyNote !== 'string') return false;

  return true;
}

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'TouchGrass backend'
  });
});

app.post('/api/generate', async (req, res) => {
  const { time, mood, energy, environment } = req.body || {};

  if (!time || !mood || !energy || !environment) {
    return res.status(400).json({
      error: 'Missing required fields: time, mood, energy, and environment.'
    });
  }

  const apiKey = process.env.DAHL_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: 'DAHL_API_KEY is not configured.'
    });
  }

  try {
    const response = await fetch(
      'https://inference.dahl.global/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'deepseek-ai/DeepSeek-V4-Flash-0731',

          // Ask the model for deterministic output.
          temperature: 0.3,

          messages: [
            {
              role: 'system',
              content: systemPrompt
            },
            {
              role: 'user',
              content:
                `Available time: ${time} minutes.\n` +
                `Mood: ${mood}.\n` +
                `Energy level: ${energy}.\n` +
                `Environment: ${environment}.`
            }
          ]
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `Dahl API error (${response.status}): ${errorText}`
      );
    }

    const data = await response.json();

    const rawContent = data?.choices?.[0]?.message?.content;

    if (!rawContent) {
      throw new Error(
        `No content returned from Dahl API. Response: ${JSON.stringify(data)}`
      );
    }

    console.log('Dahl response:', rawContent);

    const mission = extractJson(rawContent);

    if (!validateMission(mission)) {
      throw new Error(
        `Invalid mission structure: ${JSON.stringify(mission)}`
      );
    }

    return res.json(mission);
  } catch (error) {
    console.error('Generate route error:', error);

    return res.status(500).json({
      error: 'Failed to generate a mission. Please try again.'
    });
  }
});

app.listen(PORT, () => {
  console.log(
    `TouchGrass backend running on http://localhost:${PORT}`
  );
});