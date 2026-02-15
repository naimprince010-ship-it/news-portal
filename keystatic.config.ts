import { config, fields, collection } from '@keystatic/core';

export default config({
    storage: {
        kind: 'local',
    },
    collections: {
        authors: collection({
            label: 'Authors',
            slugField: 'name',
            path: 'content/authors/*',
            format: { data: 'json' },
            schema: {
                name: fields.slug({ name: { label: 'Name' } }),
                bio: fields.text({ label: 'Bio', multiline: true }),
                email: fields.text({ label: 'Email' }),
                avatar: fields.image({
                    label: 'Avatar',
                    directory: 'public/images/authors',
                    publicPath: '/images/authors/',
                }),
            },
        }),
        posts: collection({
            label: 'News Posts',
            slugField: 'title',
            path: 'content/posts/*',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({ name: { label: 'Title' } }),
                excerpt: fields.text({ label: 'Excerpt', multiline: true }),
                content: fields.document({
                    label: 'Content',
                    formatting: true,
                    dividers: true,
                    links: true,
                    images: {
                        directory: 'public/images/posts',
                        publicPath: '/images/posts/',
                    },
                }),
                coverImage: fields.image({
                    label: 'Cover Image',
                    directory: 'public/images/posts',
                    publicPath: '/images/posts/',
                }),
                author: fields.text({ label: 'Author', defaultValue: 'Staff Reporter' }),
                publishedAt: fields.date({ label: 'Published Date', defaultValue: { kind: 'today' } }),
                category: fields.select({
                    label: 'Category',
                    description: 'The category of the post',
                    options: [
                        { label: 'Bangladesh', value: 'bangladesh' },
                        { label: 'International', value: 'world' },
                        { label: 'Sports', value: 'sports' },
                        { label: 'Entertainment', value: 'entertainment' },
                        { label: 'Lifestyle', value: 'lifestyle' },
                        { label: 'Politics', value: 'politics' },
                    ],
                    defaultValue: 'bangladesh',
                }),
            },
        }),
    },
});
