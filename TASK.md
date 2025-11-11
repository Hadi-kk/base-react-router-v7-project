# Task: Rick and Morty Character Search

## Overview
Implement a character search application using the Rick and Morty GraphQL API:
- **Search Page** - Client-side search with React hook
- **Character Detail Page** - Server-side rendered with dynamic meta tags

## Setup
- GraphQL codegen configured
- `graphql-request` installed
- Run `npm run codegen` after creating/modifying GraphQL queries
- API endpoint: `https://rickandmortyapi.com/graphql`

## Requirements

### 1. GraphQL Query
Create a query to fetch a character by ID with all relevant fields.

### 2. GraphQL Client
Implement the client methods using `graphql-request`.

### 3. Search Hook
Create a `useSearch()` hook for managing search state and calling the client usng tanstack.

### 4. Search Page
Client-side search page with a form. Display character cards linking to detail pages using .

### 5. Character Detail Page
Server-side rendered route that displays character information with dynamic meta tags using tanstack

## Testing

Start dev server: `npm run dev`

Verify:
- Search functionality works client-side
- Character cards link to detail pages
- Loading and error states display correctly
- SSR working on detail page (check page source)
- Dynamic meta tags present

## Notes

- Use generated TypeScript types
- Search page should be client-side only
- Character detail page should be server-side rendered
- Handle errors appropriately (404s, API failures)

