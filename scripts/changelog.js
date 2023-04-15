const fetch = require('node-fetch');

const input = `
{
  "test 🙆‍♂️": [
    {
      "title": "absdfdsa",
      "number": 223,
      "url": "https://github.com/jaehyeon48/github-actions-test/pull/223"
    }
  ],
  "app-installation-1": [
    {
      "title": "absdfdsa",
      "number": 223,
      "url": "https://github.com/jaehyeon48/github-actions-test/pull/223"
    },
    {
      "title": "1",
      "number": 218,
      "url": "https://github.com/jaehyeon48/github-actions-test/pull/218"
    }
  ],
  "reivews 👍": [
    {
      "title": "absdfdsa",
      "number": 223,
      "url": "https://github.com/jaehyeon48/github-actions-test/pull/223"
    }
  ],
  "ab-experiments": [
    {
      "title": "absdfdsa",
      "number": 223,
      "url": "https://github.com/jaehyeon48/github-actions-test/pull/223"
    },
    {
      "title": "[triple-media] drawer action 조건 추가",
      "number": 202,
      "url": "https://github.com/jaehyeon48/github-actions-test/pull/202"
    },
    {
      "title": "[ab-experiments] img, video global style height: auto 제거",
      "number": 201,
      "url": "https://github.com/jaehyeon48/github-actions-test/pull/201"
    }
  ],
  "common": [
    {
      "title": "absdfdsa",
      "number": 223,
      "url": "https://github.com/jaehyeon48/github-actions-test/pull/223"
    }
  ],
  "server": [
    {
      "title": "absdfdsa",
      "number": 223,
      "url": "https://github.com/jaehyeon48/github-actions-test/pull/223"
    },
    {
      "title": "[triple-media] drawer action 조건 추가",
      "number": 202,
      "url": "https://github.com/jaehyeon48/github-actions-test/pull/202"
    }
  ],
  "library": [
    {
      "title": "absdfdsa",
      "number": 223,
      "url": "https://github.com/jaehyeon48/github-actions-test/pull/223"
    }
  ],
  "triple-media": [
    {
      "title": "[triple-media] drawer action 조건 추가",
      "number": 202,
      "url": "https://github.com/jaehyeon48/github-actions-test/pull/202"
    },
    {
      "title": "[common] npm 9 이상 버전 사용",
      "number": 200,
      "url": "https://github.com/jaehyeon48/github-actions-test/pull/200"
    }
  ],
  "socketServer": [
    {
      "title": "[triple-media] drawer action 조건 추가",
      "number": 202,
      "url": "https://github.com/jaehyeon48/github-actions-test/pull/202"
    }
  ]
}
`;

function getChatGptPrompt(inputData) {
	return `
Read the following example and markdown format, and write a markdown using given input data in exactly same format. Note that you must remove emojis from package names, and all items must be grouped by their package names properly.
Markdown format:
\`\`\`
### <package_name>

- <title> [#<number>](<url>)
\`\`\`
JSON data format:
\`\`\`
{
  "package_name": [
    {
      "title": "...,
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

// async function fetchPrsInMilestone() {
//   const response = await fetch(`https://api.github.com/search/issues?q=milestone:v13.2.3+type:pr+repo:jaehyeon48/github-actions-test&per_page=100`)
//   curl -L \
//   -H "Accept: application/vnd.github+json" \
//   -H "Authorization: Bearer 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"\
//   -H "X-GitHub-Api-Version: 2022-11-28" \
//   "https://api.github.com/search/issues?q=milestone:v13.2.3+type:pr+repo:jaehyeon48/github-actions-test&per_page=100" | jq 'reduce (.items[] | select(.pull_request.merged_at != null and (.labels | map(select(.name == "release")) | length == 0))) as $item ({}; .[$item.labels[].name] += [{title: $item.title, number: $item.number, url: $item.html_url}])'
// }

console.log(process.env)
async function writeChangelog() {
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
					content: getChatGptPrompt(input)
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

writeChangelog();
