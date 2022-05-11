import { render, screen } from '@testing-library/react';
import { CustomWrapper } from '@lib/testingLibrary/react';
import Holdings from '../Main/Holdings';

describe('Holdings main page layout', () => {
	test('Should have a "보유종목" header', () => {
		render(
			<CustomWrapper>
				<Holdings />
			</CustomWrapper>
		);

		expect(screen.getByRole('heading', { level: 1, name: '보유종목' })).toBeInTheDocument();
	});

	test(`Should have a indicator of the number of user's holdings`, () => {
		render(
			<CustomWrapper>
				<Holdings />
			</CustomWrapper>
		);

		expect(screen.getByTestId('num-of-holdings')).toBeInTheDocument();
	});

	test('Should have a portfolio select component', () => {
		render(
			<CustomWrapper>
				<Holdings />
			</CustomWrapper>
		);

		expect(screen.getByTestId('select-portfolio')).toBeInTheDocument();
	});

	test('Should have a filter button', () => {
		render(
			<CustomWrapper>
				<Holdings />
			</CustomWrapper>
		);

		expect(screen.getByRole('button', { name: /필터/ })).toBeInTheDocument();
	});

	test('Should have an add a new holdings button', () => {
		render(
			<CustomWrapper>
				<Holdings />
			</CustomWrapper>
		);

		expect(screen.getByRole('button', { name: /새 거래내역 추가/ })).toBeInTheDocument();
	});

	test('Should have a search holdings input', () => {
		render(
			<CustomWrapper>
				<Holdings />
			</CustomWrapper>
		);

		expect(screen.getByPlaceholderText(/보유종목 검색/)).toBeInTheDocument();
	});

	test('Should have holdings list headers', () => {
		render(
			<CustomWrapper>
				<Holdings />
			</CustomWrapper>
		);

		expect(screen.getByText(/티커/)).toBeInTheDocument();
		expect(screen.getByText(/현재가/)).toBeInTheDocument();
		expect(screen.getByText(/평단가/)).toBeInTheDocument();
		expect(screen.getByText(/보유수량/)).toBeInTheDocument();
		expect(screen.getByText(/평가금액/)).toBeInTheDocument();
		expect(screen.getByText(/일일 손익/)).toBeInTheDocument();
		expect(screen.getByText(/총 손익/)).toBeInTheDocument();
	});
});
