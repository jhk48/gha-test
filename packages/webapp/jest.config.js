export default {
	preset: "ts-jest",
	transform: {
		'^.+\\.(ts|tsx)?$': 'ts-jest',
    "^.+\\.(js|jsx)$": "babel-jest"
	},
	setupFilesAfterEnv: ['./src/setupTests.ts'],
	moduleNameMapper: {
		'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
			'<rootDir>/__mocks__/fileMock.js',
		'\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
		'@src(.*)$': '<rootDir>/src$1',
		'@components(.*)$': '<rootDir>/src/components$1',
		'@pages(.*)$': '<rootDir>/src/pages$1',
		'@assets(.*)$': '<rootDir>/src/assets$1',
		'@constants(.*)$': '<rootDir>/src/constants$1',
		'@types': '<rootDir>/src/types/index.ts',
		'@styles(.*)$': '<rootDir>/src/styles$1',
		'@hooks(.*)$': '<rootDir>/src/hooks$1',
		'@api(.*)$': '<rootDir>/src/api$1',
		'@utils(.*)$': '<rootDir>/src/utils$1',
		'@configs(.*)$': '<rootDir>/src/configs$1',
		'@lib(.*)$': '<rootDir>/src/lib$1'
	}
};
