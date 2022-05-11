import { render, screen } from '@testing-library/react';
import { CustomWrapper } from '@lib/testingLibrary/react';
import AddStockTransactionPage from '../ModalPage/AddNewStockTransaction';

test('Should have a "거래내역 추가" header', async () => {
	render(
		<CustomWrapper>
			<AddStockTransactionPage portfolioId={-1} />
		</CustomWrapper>
	);

	expect(await screen.findByText(/거래내역 추가/)).toBeInTheDocument();
});

test('Should have a search stock input', async () => {
	render(
		<CustomWrapper>
			<AddStockTransactionPage portfolioId={-1} />
		</CustomWrapper>
	);

	expect(await screen.findByPlaceholderText('종목 검색...')).toBeInTheDocument();
});

test('Should have select transaction type radio inputs', async () => {
	render(
		<CustomWrapper>
			<AddStockTransactionPage portfolioId={-1} />
		</CustomWrapper>
	);

	expect(await screen.findByLabelText('매수')).toBeInTheDocument();
	expect(await screen.findByLabelText('매도')).toBeInTheDocument();
});

test('Should have ticker, price, and quantity inputs', async () => {
	render(
		<CustomWrapper>
			<AddStockTransactionPage portfolioId={-1} />
		</CustomWrapper>
	);

	expect(await screen.findByLabelText('종목 티커')).toBeInTheDocument();
	expect(await screen.findByLabelText('가격')).toBeInTheDocument();
	expect(await screen.findByLabelText('수량')).toBeInTheDocument();
});

test('Should have a submit button', async () => {
	render(
		<CustomWrapper>
			<AddStockTransactionPage portfolioId={-1} />
		</CustomWrapper>
	);

	expect(await screen.findByRole('button', { name: '추가하기' })).toBeInTheDocument();
});
