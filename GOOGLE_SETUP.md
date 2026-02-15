# Google Integrations Setup Guide

To enable Google services, you need to create accounts/projects and retrieve API keys. Update your `.env.local` file with these keys.

## 1. Google Analytics (GA4)
1.  Go to [analytics.google.com](https://analytics.google.com/).
2.  Create an account and a property for your website.
3.  Go to **Admin** > **Data Streams** > **Web**.
4.  Copy the **Measurement ID** (starts with `G-`).
5.  Update `.env.local`:
    ```
    NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
    ```

## 2. Google Search Console
1.  Go to [search.google.com/search-console](https://search.google.com/search-console).
2.  Add a property (URL prefix or Domain).
3.  Choose **HTML Tag** verification method.
4.  Copy only the verification code from the tag (content="**YOUR_CODE**").
5.  Update `.env.local`:
    ```
    GOOGLE_SITE_VERIFICATION="your_verification_code"
    ```

## 3. Google OAuth (Login)
1.  Go to [console.cloud.google.com](https://console.cloud.google.com/).
2.  Create a Project.
3.  Go to **APIs & Services** > **OAuth consent screen** > Configure (External).
4.  Go to **Credentials** > **Create Credentials** > **OAuth client ID**.
    -   Application type: **Web application**.
    -   Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google` (Add production URL later).
5.  Copy **Client ID** and **Client Secret**.
6.  Update `.env.local`:
    ```
    GOOGLE_CLIENT_ID="your_client_id"
    GOOGLE_CLIENT_SECRET="your_client_secret"
    ```

## 4. Google AdSense
1.  Go to [adsense.google.com](https://adsense.google.com/).
2.  Add your site.
3.  Get your **Publisher ID** (starts with `ca-pub-`).
4.  Update `.env.local`:
    ```
    NEXT_PUBLIC_ADSENSE_ID="ca-pub-xxxxxxxxxxxxxxxx"
    ```
