import appRouter from '@/server'
import { handle } from 'hono/vercel'

// This is a Cloudflare Worker that serves both static assets and the API
export default {
  async fetch(request, env, ctx) {
    try {
      const url = new URL(request.url)
      
      // Handle API requests
      if (url.pathname.startsWith('/api')) {
        const apiHandler = handle(appRouter.handler)
        
        // Match request method to the appropriate handler
        if (request.method === 'GET') {
          return await apiHandler(request, env, ctx)
        } else if (request.method === 'POST') {
          return await apiHandler(request, env, ctx)
        }
      }
      
      // For all other requests, serve the Next.js app
      // Pass the request to the next handler in the chain
      return fetch(request)
    } catch (err) {
      console.error('Worker error:', err)
      return new Response('Server Error', { status: 500 })
    }
  }
}