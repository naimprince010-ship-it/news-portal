import { NextRequest, NextResponse } from 'next/server';
import { fetchRSSFeed, RSSItem } from '@/lib/rss';
import { Octokit } from '@octokit/rest';
import slugify from 'slugify';

// Configuration
const RSS_FEED_URL = 'https://news.ycombinator.com/rss'; // Example: Hacker News
const GITHUB_OWNER = 'naimprince010-ship-it'; // TODO: make dynamic or env var
const GITHUB_REPO = 'news-portal';
const AUTHOR_EMAIL = 'bot@newsportal.com';
const AUTHOR_NAME = 'NewsBot';

export async function GET(request: NextRequest) {
    // Security Check
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const feedItems = await fetchRSSFeed(RSS_FEED_URL);
        const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

        let createdCount = 0;

        for (const item of feedItems.slice(0, 5)) { // Limit to 5 latest items per run
            const slug = slugify(item.title, { lower: true, strict: true });
            const path = `content/posts/${slug}.mdoc`;

            const content = `---
title: "${item.title.replace(/"/g, '\\"')}"
summary: "${(item.contentSnippet || item.content || '').slice(0, 200).replace(/"/g, '\\"')}"
publishedDate: "${item.pubDate}"
authors:
  - news-bot
categories:
  - technology
---

${item.content || item.contentSnippet || ''}

[Read execute source](${item.link})
`;


            try {
                // Check if file exists
                await octokit.repos.getContent({
                    owner: GITHUB_OWNER,
                    repo: GITHUB_REPO,
                    path,
                });
                console.log(`Skipping existing post: ${slug}`);
            } catch (e) {
                // File does not exist, create it
                await octokit.repos.createOrUpdateFileContents({
                    owner: GITHUB_OWNER,
                    repo: GITHUB_REPO,
                    path,
                    message: `Add post: ${item.title}`,
                    content: Buffer.from(content).toString('base64'),
                    committer: {
                        name: AUTHOR_NAME,
                        email: AUTHOR_EMAIL,
                    },
                    author: {
                        name: AUTHOR_NAME,
                        email: AUTHOR_EMAIL,
                    },
                });
                createdCount++;
            }
        }

        return NextResponse.json({ success: true, created: createdCount });
    } catch (error: any) {
        console.error('Cron job failed:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
