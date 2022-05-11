import { SyntheticEvent } from 'react';
import { useAuth, useModal } from '@hooks/index';
import { AuthPage } from '@pages/index';
import { LinkButton, Button } from './styles';

interface Props {
	authText: string;
	unAuthText: string;
}

export default function HomeMainButton({ authText, unAuthText }: Props) {
	const isAuthenticated = useAuth();
	const { openModal } = useModal();

	function handleOpenLogInModal(e: SyntheticEvent) {
		openModal(e, <AuthPage />);
	}

	return (
		<>
			{isAuthenticated ? (
				<LinkButton to="/portfolios">{authText}</LinkButton>
			) : (
				<Button type="button" onClick={handleOpenLogInModal}>
					{unAuthText}
				</Button>
			)}
		</>
	);
}
