import { NextRequest } from 'next/server'

const MODEL = 'meta-llama/llama-3.3-8b-instruct:free'

function promptFor(description: string) {
  return `You are an expert Luau and Lua configuration engineer. Generate a customized configuration script for this request:\n\n${description}\n\nRequirements:\n- Return only valid Luau/Lua source code, with no Markdown fences or explanation.\n- Prefer a clear Config table with sensible defaults and comments only where useful.\n- Keep the result self-contained and safe: do not include credential theft, destructive behavior, exploits, malware, or code that bypasses access controls.\n- Match the requested features precisely and use idiomatic Luau where appropriate.`
}

async function generate(description: string) {
  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) return new Response('OPENROUTER_API_KEY is not configured.', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } })

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
      'HTTP-Referer': 'https://v0.app',
      'X-Title': 'ConfigLab',
    },
    body: JSON.stringify({ model: MODEL, messages: [{ role: 'user', content: promptFor(description) }], temperature: 0.35, max_tokens: 1800 }),
  })

  const payload = await response.json()
  if (!response.ok) {
    const message = payload?.error?.message || 'The free model could not generate a configuration.'
    return new Response(message, { status: response.status, headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
  }

  const text = payload?.choices?.[0]?.message?.content?.trim()
  if (!text) return new Response('The free model returned an empty configuration.', { status: 502, headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
  return new Response(text.replace(/^```(?:lua|luau)?\s*/i, '').replace(/\s*```$/i, ''), { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' } })
}

export async function GET(request: NextRequest) {
  const description = request.nextUrl.searchParams.get('description')?.trim()
  if (!description) return new Response('Add a description query parameter.', { status: 400, headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
  if (description.length > 4000) return new Response('Description is too long.', { status: 413, headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
  try { return await generate(description) } catch { return new Response('Unable to reach Gemini.', { status: 502, headers: { 'Content-Type': 'text/plain; charset=utf-8' } }) }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const description = typeof body?.description === 'string' ? body.description.trim() : ''
    if (!description) return new Response('Add a description.', { status: 400, headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
    if (description.length > 4000) return new Response('Description is too long.', { status: 413, headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
    return await generate(description)
  } catch { return new Response('Invalid request.', { status: 400, headers: { 'Content-Type': 'text/plain; charset=utf-8' } }) }
}
