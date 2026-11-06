import { NextResponse } from 'next/server'

const ORDER_TIMEOUT_MS = 8_000

export async function POST(request: Request) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL

  if (!webhookUrl) {
    return NextResponse.json({ error: 'Order delivery is not configured.' }, { status: 503 })
  }

  let payload: { orderNumber?: unknown; plan?: unknown }
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const orderNumber = typeof payload.orderNumber === 'string' ? payload.orderNumber.slice(0, 80) : ''
  const plan = typeof payload.plan === 'string' ? payload.plan.slice(0, 80) : ''

  if (!orderNumber || !plan) {
    return NextResponse.json({ error: 'Order number and plan are required.' }, { status: 400 })
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), ORDER_TIMEOUT_MS)

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'Opex Orders',
        embeds: [{
          title: 'New premium key order',
          color: 0x8b5cf6,
          fields: [
            { name: 'Order number', value: orderNumber, inline: true },
            { name: 'Plan', value: plan, inline: true },
          ],
          timestamp: new Date().toISOString(),
        }],
      }),
      signal: controller.signal,
    })

    if (!response.ok) {
      return NextResponse.json({ error: 'Discord rejected the order.' }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Unable to deliver the order.' }, { status: 502 })
  } finally {
    clearTimeout(timeout)
  }
}
