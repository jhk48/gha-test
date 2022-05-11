import { useTitle } from '@hooks/Title';
import * as Style from './style';

export default function NotFound() {
	useTitle('Portbullio - 404 Notfound');

	return (
		<Style.Wrapper>
			<Style.Header>404</Style.Header>
			<Style.Notice>죄송합니다. 요청하신 페이지를 찾을 수 없습니다.</Style.Notice>
			<Style.BackToHomeButton to="/">홈으로 돌아가기</Style.BackToHomeButton>
		</Style.Wrapper>
	);
}
