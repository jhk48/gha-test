import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CustomWrapper } from '@lib/testingLibrary/react';
import Navbar from '../index';

describe('Navbar layout', () => {
	test('Should have a navbar main logo', () => {
		render(
			<CustomWrapper>
				<Navbar />
			</CustomWrapper>
		);

		expect(screen.getByAltText('Navbar main logo')).toBeInTheDocument();
	});

	test('Should not have navbar icons on unauthenticated state', () => {
		render(
			<CustomWrapper>
				<Navbar />
			</CustomWrapper>
		);

		expect(screen.queryByRole('link', { name: /대시보드/ })).not.toBeInTheDocument();
		expect(screen.queryByRole('link', { name: /내 종목/ })).not.toBeInTheDocument();
		expect(screen.queryByRole('link', { name: /내 포트폴리오/ })).not.toBeInTheDocument();
		expect(screen.queryByRole('link', { name: /현금/ })).not.toBeInTheDocument();
		expect(screen.getByRole('button', { name: /로그인/ })).toBeInTheDocument();
	});

	test('Should have navbar icons on authenticated state', () => {
		render(
			<CustomWrapper authValue>
				<Navbar />
			</CustomWrapper>
		);

		expect(screen.getByRole('link', { name: /대시보드/ })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: /내 종목/ })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: /내 포트폴리오/ })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: /현금/ })).toBeInTheDocument();
	});

	test('Should render user profile button on authenticated state', () => {
		render(
			<CustomWrapper authValue>
				<Navbar />
			</CustomWrapper>
		);

		expect(screen.getByLabelText('User profile button')).toBeInTheDocument();
	});

	test('Should render profile dropdown', () => {
		render(
			<CustomWrapper authValue>
				<Navbar />
			</CustomWrapper>
		);

		userEvent.click(screen.getByLabelText('User profile button'));
		expect(screen.getByText('프로필 설정')).toBeInTheDocument();
		expect(screen.getByLabelText('Logout')).toBeInTheDocument();
	});
});
