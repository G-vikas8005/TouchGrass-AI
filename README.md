# TouchGrass AI

TouchGrass AI is a lightweight, purpose-driven web app that helps people turn a small window of free time into a realistic outdoor mission.

## Tech stack

- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express
- AI: Dahl inference API with DeepSeek V4 Flash

## Run locally

1. In the backend folder, create a `.env` file using `.env.example` and add your Dahl API key.
2. Start the backend:
   ```bash
   cd backend
   npm install
   npm run dev
   ```
3. Start the frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
4. Open the Vite URL shown in the terminal.

## Backend endpoint

POST `/api/generate`

Example body:

```json
{
  "time": 30,
  "mood": "Explore",
  "energy": "Medium",
  "environment": "college campus"
}
```

## Notes

- The frontend never sees the DAHL_API_KEY.
- The app is intentionally simple and focused on getting users outside quickly.
