import { render, screen } from '@testing-library/react';
import { CustomWrapper } from '@lib/testingLibrary/react';
import { Portfolio } from '@prisma/client';
import PortfolioList from '../Main/PortfolioList';
import SetDefaultButton from '../Main/SetDefaultButton';

test('Should have a loading indicator', () => {
	render(
		<CustomWrapper>
			<PortfolioList isLoading portfolioList={dummyPortfolioList} />
		</CustomWrapper>
	);

	expect(screen.getByText(/로딩 중/)).toBeInTheDocument();
});

test('Should have an empty portfolio notice', () => {
	render(
		<CustomWrapper>
			<PortfolioList isLoading={false} portfolioList={[]} />
		</CustomWrapper>
	);

	expect(screen.getByText(/포트폴리오가 없습니다/)).toBeInTheDocument();
});

test('Should have a correct portfolio item layout', () => {
	render(
		<CustomWrapper>
			<PortfolioList isLoading={false} portfolioList={dummyPortfolioList} />
		</CustomWrapper>
	);

	expect(screen.getByText(/포트폴리오 이름 포트폴리오 이름/)).toBeInTheDocument();
	expect(screen.getByRole('button', { name: /변경/ })).toBeInTheDocument();
	expect(screen.getByRole('button', { name: /이름 수정/ })).toBeInTheDocument();
	expect(screen.getByRole('button', { name: /삭제/ })).toBeInTheDocument();
});

test('Should indicate a default portfolio loading message', () => {
	render(
		<CustomWrapper>
			<PortfolioList isLoading={false} portfolioList={dummyPortfolioList} />
		</CustomWrapper>
	);

	expect(screen.getByText(/로딩중/)).toBeInTheDocument();
});

test('Should indicate a default portfolio', () => {
	render(
		<CustomWrapper>
			<SetDefaultButton
				defaultPortfolioId={1}
				portfolioId={1}
				portfolioName=""
				isError={false}
				isLoading={false}
				refetch={jest.fn()}
			/>
		</CustomWrapper>
	);

	expect(screen.getByRole('button', { name: /기본 포트폴리오/ })).toBeInTheDocument();
});

test(`Should show '기본으로 설정하기' text on not-default portfolio`, () => {
	render(
		<CustomWrapper>
			<SetDefaultButton
				defaultPortfolioId={1}
				portfolioId={2}
				portfolioName=""
				isError={false}
				isLoading={false}
				refetch={jest.fn()}
			/>
		</CustomWrapper>
	);

	expect(screen.getByRole('button', { name: /기본으로 설정하기/ })).toBeInTheDocument();
});

const dummyPortfolioList: Portfolio[] = [
	{
		id: 1,
		userId: 1,
		name: '포트폴리오 이름 포트폴리오 이름',
		privacy: 'public',
		createdAt: new Date()
	}
];
