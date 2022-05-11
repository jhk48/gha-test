import { useTitle } from '@hooks/Title';
import * as Style from './style';

export default function NotFound() {
	useTitle('Portbullio - 지원하지 않는 종목');

	return (
		<Style.Wrapper>
			<Style.Header>OOPS!</Style.Header>
			<Style.Notice>죄송합니다. 지원하지 않는 종목입니다.</Style.Notice>
			<Style.BackToHomeButton to="/">홈으로 돌아가기</Style.BackToHomeButton>
		</Style.Wrapper>
	);
}
