# FlexPrice Storybook Assignment

A comprehensive frontend component system and Storybook implementation built with React, TypeScript, Vite, TailwindCSS, Storybook, Zustand, TanStack Query, and Vitest.

## Live Demo

### Storybook Deployment

Add your deployed Vercel URL here:

```bash
flexprice-storybook-assignment-ljvo.vercel.app
```

---

# Overview

This project focuses on building a scalable frontend component system with:

* Reusable UI components
* Storybook documentation and interaction testing
* Zustand-based filter persistence
* Configurable TanStack Query caching utilities
* Vitest unit/component testing
* TailwindCSS-based styling
* Vercel deployment

The assignment demonstrates frontend architecture patterns commonly used in production-scale SaaS dashboards.

---

# Tech Stack

## Core

* React
* TypeScript
* Vite
* TailwindCSS
* Storybook

## State Management

* Zustand
* React Query (TanStack Query v5)

## Testing

* Vitest
* React Testing Library
* Storybook interaction tests

## Deployment

* Vercel

---

# Implemented Components

## Atoms

* Button
* Checkbox
* DateRangePicker
* Input
* Modal
* Progress
* Select
* Spinner
* Tooltip

## Molecules

* EventFilter
* QueryBuilder
* Table
* Tabs

## Organisms

* CommandPalette
* EmptyPage
* PlanPriceTable

---

# Storybook Coverage

Every component story includes:

* Default story
* Variants and visual states
* Controls using args and argTypes
* Documentation blocks
* Interaction tests for interactive components

Examples:

* Loading states
* Disabled states
* Error states
* Empty states
* Layout variants
* Dashboard usage examples

---

# Advanced Challenges Implemented

## Challenge A — useFilterStore (Zustand)

Built a reusable Zustand-powered filter persistence system.

### Features

* Session storage persistence
* Route-based filter isolation
* URL fingerprint syncing
* Reset functionality
* Clean filter API

### API

```ts
setFilter(key, value)
resetFilters()
getFilters()
```

### Persistence Example

```txt
filters:customers
filters:invoices
filters:plans
```

### Benefits

* Prevents large query-string bloat
* Preserves filter state across reloads
* Keeps URLs shareable using lightweight fingerprints

---

## Challenge C — createQueryConfig Utility

Implemented centralized React Query caching configuration.

### Global Defaults

```ts
staleTime: 5 * 60 * 1000
gcTime: 10 * 60 * 1000
```

### Presets

```ts
REALTIME
DEFAULT
STATIC
```

### Example Usage

```ts
useQuery({
  queryKey: ['invoices'],
  queryFn: fetchInvoices,
  ...createQueryConfig(QUERY_CONFIG_PRESETS.REALTIME),
});
```

### Benefits

* Consistent caching strategy
* Easier query optimization
* Declarative cache overrides
* Improved frontend performance

---

# Testing

## Unit Tests

Implemented utility tests for:

* Currency formatting
* Error message handling
* Billing calculations
* Subscription helpers
* Quantity modification logic

## Component Tests

Implemented render/interaction tests for:

* Button
* Checkbox
* Input

## Running Tests

Run all tests:

```bash
npm run test
```

Run specific tests:

```bash
npx vitest run src/components/atoms/Button/Button.test.tsx
```

---

# Storybook

## Run Storybook Locally

```bash
npm run storybook
```

## Build Storybook

```bash
npm run build-storybook
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/hardik07777/flexprice-storybook-assignment.git
```

## Navigate Into Project

```bash
cd flexprice-storybook
```

## Install Dependencies

```bash
npm install
```

## Start Development Server

```bash
npm run dev
```

---

# Project Structure

```txt
src/
 ├── components/
 │    ├── atoms/
 │    ├── molecules/
 │    └── organisms/
 │
 ├── hooks/
 ├── stores/
 ├── utils/
 ├── lib/
 ├── tests/
 │
.storybook/
```

---

# Tailwind + Storybook Integration

Integrated TailwindCSS into Storybook using:

* tailwind.config.js
* postcss.config.js
* global CSS imports in Storybook preview

This ensures all component styles render consistently in local and deployed environments.

---

# Deployment

The project is deployed using Vercel.

## Build Settings

### Build Command

```bash
npm run build-storybook
```

### Output Directory

```bash
storybook-static
```

---

# Key Learnings

Through this assignment, the following production-focused frontend concepts were explored:

* Component-driven development
* Storybook documentation systems
* Scalable state management
* Query caching architecture
* Frontend testing strategies
* Persistent filter systems
* Deployment debugging
* Cross-environment consistency

---

# Author

## Hardik Goel

### GitHub

```bash
https://github.com/hardik07777
```

### LinkedIn

```bash
https://www.linkedin.com/in/hardikgoel07/
```

---

# Submission Notes

This assignment focuses heavily on:

* frontend architecture quality
* reusable systems
* scalability
* documentation
* testing
* developer experience

The implementation prioritizes maintainability and production-readiness over minimal solutions.
