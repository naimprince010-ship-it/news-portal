# Deployment Guide (Vercel)

Your Next.js news portal is ready for deployment. Follow these steps to deploy it on Vercel.

## 1. Prepare Codebase
Open your terminal and run these commands to save your changes to Git:

```bash
git add .
git commit -m "Ready for deployment: Added dashboard, analytics, and google integrations"
```

## 2. Push to GitHub
1.  Create a new repository on GitHub (e.g., `news-portal`).
2.  Push your code:
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/news-portal.git
    git branch -M main
    git push -u origin main
    ```

## 3. Deploy on Vercel
1.  Go to [vercel.com/new](https://vercel.com/new).
2.  **Import** your `news-portal` repository.
3.  **Configure Project**:
    -   **Framework Preset**: Next.js (Auto-detected).
    -   **Root Directory**: `./` (Default).
4.  **Environment Variables**:
    -   Copy all values from your `.env.local` file and add them here.
    -   (`NEXT_PUBLIC_GA_ID`, `GOOGLE_CLIENT_ID`, `AUTH_SECRET`, etc.)
    -   *Note: You can generate a new `AUTH_SECRET` for production using `openssl rand -base64 32`*.

## 4. Post-Deployment
1.  Get your production URL (e.g., `https://news-portal.vercel.app`).
2.  **Update Google OAuth**:
    -   Go to Google Cloud Console.
    -   Add your Vercel URL to "Authorized Javascript Origins".
    -   Add `https://news-portal.vercel.app/api/auth/callback/google` to "Authorized redirect URIs".
3.  **Update Google AdSense**: Add your new domain to your AdSense sites list.

## 5. Keystatic (Content Management)
Since Keystatic is currently in "Local Mode" (saving files to disk), it will work for *viewing* content on Vercel, but **you cannot edit content directly on the Vercel deployed site** without GitHub mode configuration.

For now, the workflow is:
1.  Edit content locally (`localhost:3000/keystatic`).
2.  Commit and Push changes to GitHub.
3.  Vercel will auto-redeploy with new content.

*(To enable editing on production, we would need to switch Keystatic to GitHub mode, which requires a GitHub App setup).*

## 6. Architecture Overview (FAQ)

-   **Frontend & Backend**: Both are deployed to **Vercel** as a single Next.js application.
    -   *Frontend*: React components (SSR/Client).
    -   *Backend*: API Routes & Server Actions (Serverless Functions).
-   **Database**: Currently, there is **NO external database** (like MySQL/MongoDB).
    -   Your content (Posts, Authors, Settings) is stored as **Files** (Markdown/JSON) in your **GitHub Repository**.
    -   Keystatic acts as the interface to manage these files.
    -   **Pros**: Free, fast, version-controlled.
    -   **Cons**: Edits on the live site require GitHub integration (see above).
