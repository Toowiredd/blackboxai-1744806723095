const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const OPENROUTER_API_KEY = process.env.REACT_APP_OPENROUTER_API_KEY;

export async function extractEntitiesWithAI(text) {
  if (!OPENROUTER_API_KEY) {
    throw new Error('OpenRouter API key is not set in environment variables');
  }

  const systemPrompt = {
    role: 'system',
    content: 'You are an assistant that extracts structured incident data from text. Extract individuals involved, locations, dates, descriptions, actions taken, and assets involved. Return a JSON object with these fields as arrays or strings.'
  };

  const userPrompt = {
    role: 'user',
    content: `Extract incident data from the following text:\n\n${text}`
  };

  const body = {
    model: 'gpt-4o-mini',
    messages: [systemPrompt, userPrompt],
    temperature: 0.2,
    max_tokens: 500,
  };

  const response = await fetch(OPENROUTER_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenRouter API error: ${errorText}`);
  }

  const data = await response.json();
  const aiText = data.choices?.[0]?.message?.content;

  if (!aiText) {
    throw new Error('No content returned from OpenRouter API');
  }

  try {
    // Parse AI response as JSON
    const parsed = JSON.parse(aiText);
    return parsed;
  } catch (e) {
    throw new Error('Failed to parse AI response as JSON: ' + e.message);
  }
}
