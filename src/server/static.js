// This is a Cloudflare Worker that serves static content for the Next.js app
export default {
  async fetch(request, env, ctx) {
    try {
      // For static content, pass the request to the next handler in the chain
      return await fetch(request)
    } catch (err) {
      console.error('Static Worker error:', err)
      return new Response('Server Error', { status: 500 })
    }
  }
}