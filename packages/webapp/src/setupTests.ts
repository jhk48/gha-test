import '@testing-library/jest-dom/';
import server from '@lib/msw/server';
import '@configs/env';

beforeAll(() => {
	server.listen();
	process.env.SERVER_END_POINT = 'https://localhost:5000/api';
	Object.defineProperty(window, 'matchMedia', {
		writable: true,
		value: jest.fn().mockImplementation(query => ({
			matches: false,
			media: query,
			onchange: null,
			addListener: jest.fn(), // Deprecated
			removeListener: jest.fn(), // Deprecated
			addEventListener: jest.fn(),
			removeEventListener: jest.fn(),
			dispatchEvent: jest.fn()
		}))
	});
	Object.defineProperty(window, 'setImmediate', {
		value: jest.useRealTimers
	});
});

afterEach(() => server.resetHandlers());
afterAll(() => server.close());
