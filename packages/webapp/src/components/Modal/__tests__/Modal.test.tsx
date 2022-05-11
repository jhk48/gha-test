import { render, screen } from '@testing-library/react';
import Modal from '../index';

describe('Modal layout', () => {
	test('Should have a modal backdrop', () => {
		render(
			<Modal closeFunction={jest.fn()}>
				<></>
			</Modal>
		);

		expect(screen.getByTestId('modal-backdrop')).toBeInTheDocument();
	});

	test('Should have a modal close button', () => {
		render(
			<Modal closeFunction={jest.fn()}>
				<></>
			</Modal>
		);

		expect(screen.getByLabelText('Close modal button')).toBeInTheDocument();
	});
});
