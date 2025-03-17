# CLAUDE.md - Repository Guidelines

## Build/Test/Lint Commands
```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run lint             # Run ESLint
npm run build:worker     # Build for Cloudflare Workers
npm run dev:worker       # Run Cloudflare Worker locally
npm run deploy:worker    # Deploy to Cloudflare Workers

# Database
npm run db:generate      # Generate Drizzle migrations
npm run db:migrate       # Run Drizzle migrations
npm run db:push          # Push schema to database
npm run db:studio        # Open Drizzle Studio
```

## Code Style Guidelines
- **TypeScript**: Use strict type checking with explicit return types
- **Imports**: Group imports: React/Next, UI components, utils/libs, types
- **Components**: Functional components with named exports, props interface
- **Naming**: camelCase for variables/functions, PascalCase for components/types
- **Error Handling**: Use try/catch with specific error types
- **UI Components**: Use shadcn/ui component library with Tailwind CSS
- **Database**: Use Drizzle ORM for PostgreSQL access
- **API**: Use JStack framework with Hono for API routes
- **State Management**: React Query for API data, useState for local state