import { render, screen } from '@testing-library/react';
import { CustomWrapper } from '@lib/testingLibrary/react';
import { AuthPage } from '../index';

test('Should have a logo image', async () => {
	render(
		<CustomWrapper>
			<AuthPage />
		</CustomWrapper>
	);
	const logoImage = await screen.findByAltText(/main logo/);
	expect(logoImage).toBeInTheDocument();
});

test('Should have a title saying "환영합니다"', async () => {
	render(
		<CustomWrapper>
			<AuthPage />
		</CustomWrapper>
	);
	const titleHeader = await screen.findByText(/환영합니다/);
	expect(titleHeader).toBeInTheDocument();
});

test('Should have a google oauth button', async () => {
	render(
		<CustomWrapper>
			<AuthPage />
		</CustomWrapper>
	);
	const googleOAuthButton = await screen.findByLabelText('Google auth');
	expect(googleOAuthButton).toBeInTheDocument();
});
