import { useLocation } from 'react-router-dom';
import useThemeMode from '@hooks/Theme';
import * as Style from './styles';
import { lightThemeImage, darkThemeImage } from './heroImage';

export default function Welcome() {
	const { search } = useLocation();
	const username = new URLSearchParams(search).get('username') ?? '';
	const [currentTheme] = useThemeMode();

	return (
		<>
			<Style.Header>👋회원가입을 축하합니다, {username}님!🥳</Style.Header>
			<Style.Paragraph>
				{username}님의 주식 포트폴리오 관리, Portbullio가 도와드릴게요!
			</Style.Paragraph>
			<Style.ImageContainer alignItems="center" justifyContent="center">
				<svg
					width="400"
					height="375"
					viewBox="0 0 400 375"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<title>Welcome page hero image</title>
					<rect width="400" height="375" fill="url(#pattern0)" />
					<defs>
						<pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
							<use
								xlinkHref="#image0_152_3"
								transform="translate(0.0158333) scale(0.00242083 0.00266667)"
							/>
						</pattern>
						<image
							id="image0_152_3"
							width="400"
							height="375"
							xlinkHref={currentTheme === 'light' ? lightThemeImage : darkThemeImage}
						/>
					</defs>
				</svg>
			</Style.ImageContainer>
			<Style.Anchor to="/portfolios">새 포트폴리오 만들기</Style.Anchor>
		</>
	);
}
