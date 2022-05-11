import { render, screen } from '@testing-library/react';
import { CustomWrapper } from '@lib/testingLibrary/react';
import Footer from '../index';

test(`Should have '데이터 제공자' links`, () => {
	render(
		<CustomWrapper>
			<Footer />
		</CustomWrapper>
	);

	expect(screen.getByRole('link', { name: /IEX CLOUD/i })).toBeInTheDocument();
	expect(screen.getByRole('link', { name: /Financial Modeling Prep/i })).toBeInTheDocument();
});

test(`Should have a 'email' text`, () => {
	render(
		<CustomWrapper>
			<Footer />
		</CustomWrapper>
	);

	expect(screen.getByText('이메일: iamjaehyeon48@gmail.com')).toBeInTheDocument();
});
