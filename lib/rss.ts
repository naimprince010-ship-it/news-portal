import Parser from 'rss-parser';

const parser = new Parser();

export interface RSSItem {
    title: string;
    link: string;
    pubDate: string;
    content: string;
    contentSnippet?: string;
    categories?: string[];
    creator?: string;
    isoDate?: string;
}

export async function fetchRSSFeed(feedUrl: string): Promise<RSSItem[]> {
    try {
        const feed = await parser.parseURL(feedUrl);
        return feed.items.map((item) => ({
            title: item.title || '',
            link: item.link || '',
            pubDate: item.pubDate || '',
            content: item['content:encoded'] || item.content || '',
            contentSnippet: item.contentSnippet,
            categories: item.categories,
            creator: item.creator,
            isoDate: item.isoDate,
        }));
    } catch (error) {
        console.error(`Error parsing RSS feed from ${feedUrl}:`, error);
        return [];
    }
}
