// Quick smoke-test for /api/generate
// Run with:  node test-api.js

const body = {
  time: 30,
  mood: 'Explore',
  energy: 'Medium',
  environment: 'college campus',
};

async function main() {
  console.log('Sending request to http://localhost:5000/api/generate …');

  const res = await fetch('http://localhost:5000/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const text = await res.text();

  console.log(`\nHTTP status: ${res.status}`);
  console.log('\nRaw response body:');
  console.log(text);

  try {
    const json = JSON.parse(text);
    console.log('\nParsed JSON:');
    console.log(JSON.stringify(json, null, 2));
  } catch {
    console.log('\n⚠  Response is not valid JSON.');
  }
}

main().catch((err) => {
  console.error('Fetch failed:', err);
  process.exit(1);
});
