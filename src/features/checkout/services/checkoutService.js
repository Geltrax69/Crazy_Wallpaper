/* Checkout service abstraction — mock implementation.
   Swap `processPayment` with a real payment provider later; UI stays untouched. */

export async function processPayment({ email, items, total }) {
  await new Promise((r) => setTimeout(r, 1400))
  if (!email || !email.includes('@')) {
    throw new Error('Please enter a valid email address.')
  }
  return {
    id: `pay_${Date.now().toString(36)}`,
    email,
    itemCount: items.length,
    total,
    status: 'succeeded',
    createdAt: new Date().toISOString(),
  }
}
