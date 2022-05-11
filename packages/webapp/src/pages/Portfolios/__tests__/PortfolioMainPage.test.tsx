import { render, screen } from '@testing-library/react';
import { CustomWrapper } from '@lib/testingLibrary/react';
import Portfolios from '../Main/Portfolios';

describe('Portfolio main page layout', () => {
	test('Should have a "내 포트폴리오" header', () => {
		render(
			<CustomWrapper>
				<Portfolios />
			</CustomWrapper>
		);

		expect(screen.getByRole('heading', { level: 1, name: '내 포트폴리오' })).toBeInTheDocument();
	});

	test(`Should have a indicator of the number of user's portfolios`, () => {
		render(
			<CustomWrapper>
				<Portfolios />
			</CustomWrapper>
		);

		expect(screen.getByTestId('num-of-my-portfolios')).toBeInTheDocument();
	});

	test('Should have a filter button', () => {
		render(
			<CustomWrapper>
				<Portfolios />
			</CustomWrapper>
		);

		expect(screen.getByRole('button', { name: /필터/ })).toBeInTheDocument();
	});

	test('Should have an add a new portfolio button', () => {
		render(
			<CustomWrapper>
				<Portfolios />
			</CustomWrapper>
		);

		expect(screen.getByRole('button', { name: /새 포트폴리오 추가/ })).toBeInTheDocument();
	});

	test('Should have a search portfolio input', () => {
		render(
			<CustomWrapper>
				<Portfolios />
			</CustomWrapper>
		);

		expect(screen.getByPlaceholderText(/포트폴리오 검색/)).toBeInTheDocument();
	});

	test('Should have portfolio list headers', () => {
		render(
			<CustomWrapper>
				<Portfolios />
			</CustomWrapper>
		);

		expect(screen.getByText(/이름/)).toBeInTheDocument();
		expect(screen.getByText(/공개 여부/)).toBeInTheDocument();
	});
});
