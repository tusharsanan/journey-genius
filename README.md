# Journey Genius

Journey Genius is a travel and lifestyle discovery app built with LitElement and TypeScript.  
It helps users explore restaurants, hotels, cafes, and attractions, with detailed listings, reviews, and ratings.

It contains a searchbar which allows you to search for any type of destination ranging from Cafes, restaurants and hotels to many other types. You can specify the type of destination through the select box before searching. The searchbar also has a validation of minimum 3 characters of a title to search and it is a required field.

## Features

- Browse curated places: restaurants, hotels, cafes, and more
- View details, ratings, reviews, and contact info for each location
- Built with [LitElement](https://lit.dev/) and TypeScript
- Includes unit testing & E2E testing with Cypress.
- Modern build tooling and dev server

## Getting Started

Install dependencies:

```bash
npm install
```

Build the project:

```bash
npm run build
```

Start the development server:

```bash
npm run serve
```

Run tests:

```bash
npm test
```

## Project Structure

- `/cypress` — E2E testing files
- `/src` — Source code (TypeScript, LitElement components)
- `/data/db.json` — Sample data for places and reviews

## Technologies Used

- [LitElement](https://lit.dev/) for web components
- TypeScript for type safety
- [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) for code quality
- [Mocha](https://mochajs.org/) for testing
- [@web/dev-server](https://modern-web.dev/docs/dev-server/overview/) for local development

## More Information

See [Get started](https://lit.dev/docs/getting-started/) on the Lit site for more information about LitElement.
