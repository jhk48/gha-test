import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CustomWrapper } from '@lib/testingLibrary/react';
import UserSettings from '..';

test('Should have a user profile image component', () => {
	render(
		<CustomWrapper>
			<UserSettings />
		</CustomWrapper>
	);

	expect(screen.getByTestId('user-profile-image')).toBeInTheDocument();
});

test('Should have a delete confirm message after clicking delete avatar button', () => {
	render(
		<CustomWrapper>
			<UserSettings />
		</CustomWrapper>
	);

	userEvent.click(screen.getByRole('button', { name: /이미지 삭제/ }));
	expect(screen.getByText('정말 이미지를 삭제하시겠습니까?')).toBeInTheDocument();
	expect(screen.getByRole('button', { name: '취소' })).toBeInTheDocument();
	expect(screen.getByRole('button', { name: '삭제' })).toBeInTheDocument();
});

test('Should have an email input with readonly property', () => {
	render(
		<CustomWrapper>
			<UserSettings />
		</CustomWrapper>
	);

	expect(screen.getByLabelText('이메일')).toHaveAttribute('readonly');
});

test('Should have an username input', () => {
	render(
		<CustomWrapper>
			<UserSettings />
		</CustomWrapper>
	);

	expect(screen.getByLabelText('닉네임')).toBeInTheDocument();
});

test('Should have a my bio edit input', () => {
	render(
		<CustomWrapper>
			<UserSettings />
		</CustomWrapper>
	);

	expect(screen.getByPlaceholderText('내 설명')).toBeInTheDocument();
});

test('Should have a my location edit input', () => {
	render(
		<CustomWrapper>
			<UserSettings />
		</CustomWrapper>
	);

	expect(screen.getByPlaceholderText('내 위치')).toBeInTheDocument();
});

test('Should have a edit button', () => {
	render(
		<CustomWrapper>
			<UserSettings />
		</CustomWrapper>
	);

	expect(screen.getByRole('button', { name: '프로필 수정' })).toBeInTheDocument();
});
