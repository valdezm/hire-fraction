import appRouter from '@/server'
import { handle } from 'hono/vercel'

// This is a Cloudflare Worker that handles API requests
export default {
  async fetch(request, env, ctx) {
    try {
      // Create handlers for GET and POST requests
      const apiHandler = handle(appRouter.handler)
      
      // Return the appropriate response based on the request method
      if (request.method === 'GET') {
        return await apiHandler(request, env, ctx)
      } else if (request.method === 'POST') {
        return await apiHandler(request, env, ctx)
      } else {
        return new Response('Method not allowed', { status: 405 })
      }
    } catch (err) {
      console.error('API Worker error:', err)
      return new Response('Server Error', { status: 500 })
    }
  }
}