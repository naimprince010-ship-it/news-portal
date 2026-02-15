import { Octokit } from '@octokit/rest';

const octokit = new Octokit({
    auth: process.env.GITHUB_PAT,
});

export async function createGitHubFile(
    owner: string,
    repo: string,
    path: string,
    content: string,
    message: string
) {
    try {
        // Check if file exists to get sha for update, or create new
        let sha;
        try {
            const { data } = await octokit.repos.getContent({
                owner,
                repo,
                path,
            });
            // @ts-ignore
            sha = data.sha;
        } catch (e) {
            // File doesn't exist, which is fine for new posts
        }

        if (sha) {
            console.log(`File ${path} already exists. Skipping.`);
            return null; // Avoid overwriting existing posts for now to prevent duplicates based on filename collision strategy
        }

        const { data } = await octokit.repos.createOrUpdateFileContents({
            owner,
            repo,
            path,
            message,
            content: Buffer.from(content).toString('base64'),
            sha, // undefined for new files
        });

        return data;
    } catch (error) {
        console.error(`Error creating file on GitHub:`, error);
        throw error;
    }
}
