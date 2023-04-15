import fetch from "node-fetch";

const CHAT_GPT_PROMPT = `
Write a markdown using the given data to group markdown list items by their "package" in their "packages" array. In the following format, "<package_of_packages>" refers to an element of the "packages" array for an item.  Also, remove emojis when you write "<package_of_packages>".
Desired markdown format:

### <package_of_packages>

- <title_of_an_item> [#<number_of_an_item>](<url>)
- <title_of_an_item> [#<number_of_an_item>](<url>)
...

### <package_of_packages>

- <title_of_an_item> [#<number_of_an_item>](<url>)
- <title_of_an_item> [#<number_of_an_item>](<url>)
...

Example markdown:

### ab-experiments

- [Modals] modal handler onClose 실행 분기문 이전 버전과 동일하게 변경 [#2347](https://github.com/jaehyeon48/github-actions-test/pull/2347)
- Rating 컴포넌트에 최대값,최소값 설정 추가 [#2364](https://github.com/jaehyeon48/github-actions-test/pull/2364)

### anchor

- [Modals] modal handler onClose 실행 분기문 이전 버전과 동일하게 변경 [#2347](https://github.com/jaehyeon48/github-actions-test/pull/2347)

### color-palette

- [Modals] modal handler onClose 실행 분기문 이전 버전과 동일하게 변경 [#2347](https://github.com/jaehyeon48/github-actions-test/pull/2347)

### core-elements

- Rating 컴포넌트에 최대값,최소값 설정 추가 [#2364](https://github.com/jaehyeon48/github-actions-test/pull/2364)

Input JSON:
[
	{
		"title": "트리플헤더 날아오기 효과의 속도를 변경합니다.",
		"number": 199,
		"url": "https://github.com/jaehyeon48/github-actions-test/pull/199",
		"packages": ["app-installation-1", "triple-media", "ab-experiments", "common", "library"]
	},
	{
		"title": "npm 9 이상 버전 사용",
		"number": 200,
		"url": "https://github.com/jaehyeon48/github-actions-test/pull/200",
		"packages": ["triple-media"]
	},
	{
		"title": "img, video global style height: auto 제거",
		"number": 201,
		"url": "https://github.com/jaehyeon48/github-actions-test/pull/201",
		"packages": ["ab-experiments"]
	},
	{
		"title": "drawer action 조건 추가",
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
`;

const OPENAI_KEY = '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';

async function askToChatGpt() {
	const response = await fetch('https://api.openai.com/v1/completions', {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${OPENAI_KEY}`
		},
		body: JSON.stringify({
			model: 'text-davinci-003',
			temperature: 0,
			prompt: CHAT_GPT_PROMPT
		})
	});

	console.log(await response.json());
}
askToChatGpt();
