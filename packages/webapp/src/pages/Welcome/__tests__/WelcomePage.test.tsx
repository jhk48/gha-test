import { render, screen } from '@testing-library/react';
import { CustomWrapper } from '@lib/testingLibrary/react';
import Welcome from '..';

describe('Welcome Page', () => {
	test('Should have a welcome text', () => {
		render(
			<CustomWrapper>
				<Welcome />
			</CustomWrapper>
		);

		expect(screen.getByText(/회원가입을 축하합니다/)).toBeInTheDocument();
	});

	test('Should have a welcome page hero image', () => {
		render(
			<CustomWrapper>
				<Welcome />
			</CustomWrapper>
		);

		expect(screen.getByTitle('Welcome page hero image')).toBeInTheDocument();
	});

	test('Should have a create new portfolio link button', () => {
		render(
			<CustomWrapper>
				<Welcome />
			</CustomWrapper>
		);

		expect(screen.getByRole('link', { name: /새 포트폴리오 만들기/ })).toBeInTheDocument();
	});
});
