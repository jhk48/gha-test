const fetch = require('node-fetch');

const CHAT_GPT_PROMPT = `
Read the following example, and write a markdown using given input data in exactly same format. Note that you must remove emojis from package names, and all items must be grouped by their package names properly.
\`\`\`
[
	{
		"title": "[core-elements] story title을 소문자로 변경",
		"number": 2345,
		"url": "https://github.com/titicacadev/triple-frontend/pull/2345",
		"packages": [":dart: core-elements"]
	},
	{
		"title": "[Modals] modal handler onClose 실행 분기문 이전 버전과 동일하게 변경",
		"number": 2347,
		"url": "https://github.com/titicacadev/triple-frontend/pull/2347",
		"packages": [":art: color-palette", "anchor", "ab-experiments"]
	},
	{
		"title": "cd workflow 에러 수정",
		"number": 2351,
		"url": "https://github.com/titicacadev/triple-frontend/pull/2351",
		"packages": [":muscle: common"]
	},
	{
		"title": "[core-elements] ConfirmSelector 디자인 수정",
		"number": 2359,
		"url": "https://github.com/titicacadev/triple-frontend/pull/2359",
		"packages": [":dart: core-elements"]
	},
	{
		"title": "[core-elements] Rating 컴포넌트에 최대값,최소값 설정 추가",
		"number": 2364,
		"url": "https://github.com/titicacadev/triple-frontend/pull/2364",
		"packages": [":dart: core-elements", "ab-experiments"]
	}
]
\`\`\`
Example output markdown:
\`\`\`
### ab-experiments

- [Modals] modal handler onClose 실행 분기문 이전 버전과 동일하게 변경 [#2347](https://github.com/jaehyeon48/github-actions-test/pull/2347)
- Rating 컴포넌트에 최대값,최소값 설정 추가 [#2364](https://github.com/jaehyeon48/github-actions-test/pull/2364)

### anchor

- [Modals] modal handler onClose 실행 분기문 이전 버전과 동일하게 변경 [#2347](https://github.com/jaehyeon48/github-actions-test/pull/2347)

### color-palette

- [Modals] modal handler onClose 실행 분기문 이전 버전과 동일하게 변경 [#2347](https://github.com/jaehyeon48/github-actions-test/pull/2347)

### common

- cd workflow 에러 수정 [#2351](https://github.com/jaehyeon48/github-actions-test/pull/2351)
- [core-elements] ConfirmSelector 디자인 수정 [#2359](https://github.com/jaehyeon48/github-actions-test/pull/2359)

### core-elements

- [core-elements] story title을 소문자로 변경 [#2345](https://github.com/jaehyeon48/github-actions-test/pull/2345)
- [core-elements] ConfirmSelector 디자인 수정 [#2359](https://github.com/jaehyeon48/github-actions-test/pull/2359)
- Rating 컴포넌트에 최대값,최소값 설정 추가 [#2364](https://github.com/jaehyeon48/github-actions-test/pull/2364)
\`\`\`
Input JSON data:
\`\`\`
[
	{
		"title": "[common] 트리플헤더 날아오기 효과의 속도를 변경합니다.",
		"number": 199,
		"url": "https://github.com/jaehyeon48/github-actions-test/pull/199",
		"packages": ["triple-media", "app-installation-1", "ab-experiments", "common", "library"]
	},
	{
		"title": "[common] npm 9 이상 버전 사용",
		"number": 200,
		"url": "https://github.com/jaehyeon48/github-actions-test/pull/200",
		"packages": ["triple-media"]
	},
	{
		"title": "[ab-experiments] img, video global style height: auto 제거",
		"number": 201,
		"url": "https://github.com/jaehyeon48/github-actions-test/pull/201",
		"packages": ["ab-experiments"]
	},
	{
		"title": "[triple-media] drawer action 조건 추가",
		"number": 202,
		"url": "https://github.com/jaehyeon48/github-actions-test/pull/202",
		"packages": ["triple-media", "ab-experiments", "server", "socketServer"]
	},
	{
		"title": "absdfdsa",
		"number": 223,
		"url": "https://github.com/jaehyeon48/github-actions-test/pull/223",
		"packages": [
			"test 🙆‍♂️",
			"app-installation-1",
			"reivews 👍",
			"ab-experiments",
			"common",
			"server",
			"library"
		]
	}
]
\`\`\`
Output markdown:
`;

async function askToChatGpt() {
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
					content: CHAT_GPT_PROMPT
				}
			],
			temperature: 0
		})
	});

	const { choices } = await response.json();
	console.log(choices[0].message.content);
}

async function askToChatGpt2() {
	const response = await fetch('https://api.openai.com/v1/completions', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer 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`
		},
		body: JSON.stringify({
			model: 'text-davinci-003',
			prompt: CHAT_GPT_PROMPT,
			max_tokens: 2000,
			temperature: 0
		})
	});

	const res = await response.json();
	console.log(res.usage);
	console.log(res.choices[0].text);
}
askToChatGpt2();
