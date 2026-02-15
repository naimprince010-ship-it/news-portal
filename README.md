# Prothom Alo Clone

A pixel-perfect clone of the [Prothom Alo](https://www.prothomalo.com/) news portal, built with **Next.js**, **Tailwind CSS**, and **Keystatic CMS**.

## Features

- **Authentic Design**: Custom Bengali fonts, color scheme, and responsive layout matching the original site.
- **Dynamic Content**: Powered by **Keystatic**, a file-based CMS. No database required.
- **Search Functionality**: Client-side search with instant filtering.
- **Dark Mode**: Fully supported with a toggle switch.
- **Responsive**: Optimized for Mobile, Tablet, and Desktop.

## Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    Visit `http://localhost:3000`.

3.  **Manage Content (CMS)**:
    Visit `http://localhost:3000/keystatic` to add or edit news articles.

## Deployment

This project is optimized for deployment on **Vercel**.

1.  Push the code to a GitHub repository.
2.  Import the repository into Vercel.
3.  Vercel will automatically build and deploy the site.

**Note on CMS**: Since this uses Keystatic's `local` mode, content edits should be made locally and pushed to GitHub. The live site will serve the static content. To enable live editing in production, configure Keystatic for GitHub mode.

## Project Structure

- `app/`: Next.js App Router pages and layouts.
- `components/`: Reusable UI components (Header, Footer, etc.).
- `content/`: stored content files (news posts).
- `lib/`: Utility functions and data fetchers.
- `public/`: Static assets (images, fonts).
- `keystatic.config.ts`: CMS configuration.
