import { render, screen } from '@testing-library/react';
import { CustomWrapper } from '@lib/testingLibrary/react';
import DeleteConfirm from '../ModalPage/DeleteConfirm';

describe('Portfolio delete confirm page', () => {
	test('Should have a delete confirm title', () => {
		render(
			<CustomWrapper>
				<DeleteConfirm portfolioId={1} portfolioName="" isDefaultPortfolio />
			</CustomWrapper>
		);

		expect(screen.getByText(/포트폴리오 삭제/)).toBeInTheDocument();
	});

	test('Should have an asking message', () => {
		render(
			<CustomWrapper>
				<DeleteConfirm portfolioId={1} portfolioName="포트폴리오123" isDefaultPortfolio />
			</CustomWrapper>
		);

		expect(screen.getByText(/포트폴리오123/)).toBeInTheDocument();
		expect(screen.getByText(/삭제하시겠습니까\?/)).toBeInTheDocument();
	});

	test('Should have a cancel and a delete button', () => {
		render(
			<CustomWrapper>
				<DeleteConfirm portfolioId={1} portfolioName="" isDefaultPortfolio />
			</CustomWrapper>
		);

		expect(screen.getByRole('button', { name: '취소' })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: '삭제' })).toBeInTheDocument();
	});
});
