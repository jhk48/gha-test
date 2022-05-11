import { SyntheticEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { CloseModalFn } from '@types';
import { logOut } from '@api/auth';
import { useEmitter } from '@hooks/index';
import toast from '@lib/toast';
import * as Style from './styles';

interface Props {
	closeFunction?: CloseModalFn;
}

export default function Logout({ closeFunction }: Props) {
	const location = useLocation();
	const Emitter = useEmitter();

	async function handleLogOut(e: SyntheticEvent) {
		const logOutResult = await logOut();
		if (!logOutResult) {
			toast.error({ message: '로그아웃에 실패했습니다. 다시 시도해 주세요.' });
			return;
		}
		Emitter.emit('LOG_OUT', location.pathname);

		toast.success({ message: '성공적으로 로그아웃 되었습니다.' });
		closeFunction!(e, false);
	}

	return (
		<Style.PageContainer>
			<Style.Header>정말 로그아웃 하시겠습니까?</Style.Header>
			<Style.ButtonContainer>
				<Style.CancelButton type="button" onClick={closeFunction}>
					취소
				</Style.CancelButton>
				<Style.LogOutButton type="button" onClick={handleLogOut}>
					로그아웃
				</Style.LogOutButton>
			</Style.ButtonContainer>
		</Style.PageContainer>
	);
}
