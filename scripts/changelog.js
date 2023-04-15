const fetch = require('node-fetch');

function generateChatGptPrompt(inputData) {
	return `
Read the following example and markdown format, and write a markdown using given input data in exactly same format. Note that you must remove emojis from package names, and all items must be grouped by their package names properly.
Markdown format:
\`\`\`
### <package_name>

- <title> [#<number>](<url>)
- <title> [#<number>](<url>)
\`\`\`
JSON data format:
\`\`\`
{
  "package_name": [
    {
      "title": "...",
      "number": 123,
      "url": "..."
    }
  ]
}
\`\`\`
Example JSON data:
\`\`\`
{
  "ab-experiments": [
    {
      "title": "[core-elements] story title을 소문자로 변경",
      "number": 2345,
      "url": "https://github.com/titicacadev/triple-frontend/pull/2345"
    },
    {
      "title": "[core-elements] Rating 컴포넌트에 최대값,최소값 설정 추가",
      "number": 2364,
      "url": "https://github.com/titicacadev/triple-frontend/pull/2364"
    }
  ],
  "common": [
    {
      "title": "cd workflow 에러 수정",
      "number": 2351,
      "url": "https://github.com/titicacadev/triple-frontend/pull/2351"
    },
    {
      "title": "[core-elements] Rating 컴포넌트에 최대값,최소값 설정 추가",
      "number": 2364,
      "url": "https://github.com/titicacadev/triple-frontend/pull/2364"
    }
  ],
  "core-elements": [
    {
      "title": "[core-elements] story title을 소문자로 변경",
      "number": 2345,
      "url": "https://github.com/titicacadev/triple-frontend/pull/2345"
    },
    {
      "title": "[core-elements] ConfirmSelector 디자인 수정",
      "number": 2359,
      "url": "https://github.com/titicacadev/triple-frontend/pull/2359"
    },
    {
      "title": "[core-elements] Rating 컴포넌트에 최대값,최소값 설정 추가",
      "number": 2364,
      "url": "https://github.com/titicacadev/triple-frontend/pull/2364"
    }
  ],
}
\`\`\`
Example output markdown:
\`\`\`
### ab-experiments

- [core-elements] story title을 소문자로 변경 [#2345](https://github.com/jaehyeon48/github-actions-test/pull/2345)
- Rating 컴포넌트에 최대값,최소값 설정 추가 [#2364](https://github.com/jaehyeon48/github-actions-test/pull/2364)

### common

- cd workflow 에러 수정 [#2351](https://github.com/jaehyeon48/github-actions-test/pull/2351)
- Rating 컴포넌트에 최대값,최소값 설정 추가 [#2364](https://github.com/jaehyeon48/github-actions-test/pull/2364)

### core-elements

- [core-elements] story title을 소문자로 변경 [#2345](https://github.com/jaehyeon48/github-actions-test/pull/2345)
- [core-elements] ConfirmSelector 디자인 수정 [#2359](https://github.com/jaehyeon48/github-actions-test/pull/2359)
- Rating 컴포넌트에 최대값,최소값 설정 추가 [#2364](https://github.com/jaehyeon48/github-actions-test/pull/2364)
\`\`\`
Input JSON data:
\`\`\`
${inputData}
\`\`\`
Output markdown:
`;
}

function removeEmojis(str) {
	const emojiRegex =
		/([\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F1E0}-\u{1F1FF}\u{1F191}-\u{1F251}\u{FE0E}\u{FE0F}]|[\u{1F3FB}-\u{1F3FF}][\u{1F9B0}-\u{1F9B3}])|([\u{200D}\u{FE0E}\u{FE0F}]|[\u{1F3FB}-\u{1F3FF}])/gu;
	const emojiPresentationRegex = /\p{Emoji_Presentation}/gu;
	const emojiModifierRegex = /\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?/gu;

	return str
		.replace(emojiRegex, '')
		.replace(emojiPresentationRegex, '')
		.replace(emojiModifierRegex, '')
		.trim();
}

function groupPullRequestsByLabel(pullRequests) {
	const groupedPullRequests = pullRequests.reduce((result, { labels, title, number, url }) => {
		labels.forEach(label => {
			if (!result[label]) {
				result[label] = [];
			}
			result[label].push({
				title,
				number,
				url
			});
		});

		return result;
	}, {});

	return Object.keys(groupedPullRequests)
		.sort((keyA, keyB) => keyA.toLowerCase().localeCompare(keyB.toLowerCase()))
		.reduce((acc, key) => ({ ...acc, [key]: groupedPullRequests[key] }), {});
}

async function fetchPrsInMilestone() {
	const response = await fetch(
		`https://api.github.com/search/issues?q=milestone:${process.env.CURRENT_VERSION}+type:pr+repo:${process.env.GITHUB_REPOSITORY}&per_page=100`,
		{
			headers: {
				Accept: 'application/vnd.github+json',
				Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
				'X-GitHub-Api-Version': '2022-11-28'
			}
		}
	);

	const data = await response.json();
	if (data.total_count === undefined) {
		console.error(data.message);
		process.exit(1);
	}

	const pullRequests = data.items
		.filter(
			({ pull_request, labels }) =>
				!!pull_request.merged_at &&
				labels.length > 0 &&
				!labels.some(({ name }) => name === 'release')
		)
		.map(({ title, number, html_url: url, labels }) => ({
			title,
			number,
			url,
			labels: labels.map(({ name }) => removeEmojis(name))
		}))
		.sort((a, b) => a.number - b.number);

	console.log(groupPullRequestsByLabel(pullRequests));
	console.log(writeChangelog(groupPullRequestsByLabel(pullRequests)));
}

async function writeChangelog(prsInMilestone) {
	const response = await fetch('https://api.openai.com/v1/chat/completions', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer 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`
		},
		body: JSON.stringify({
			model: 'gpt-3.5-turbo',
			messages: [
				{
					role: 'user',
					content: generateChatGptPrompt(JSON.stringify(prsInMilestone))
				}
			],
			temperature: 0
		})
	});

	const res = await response.json();
	if (res.error) {
		console.error(res.error.message);
		return;
	}

	console.log(res.usage);
	console.log(res.choices[0].message.content);
}

fetchPrsInMilestone();
