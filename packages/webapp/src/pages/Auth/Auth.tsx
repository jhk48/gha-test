import { useLocation } from 'react-router-dom';
import useThemeMode from '@hooks/Theme';
import envConfig from '@configs/env';
import mainLogoLight from '@assets/images/mainLogoLight.webp';
import mainLogoDark from '@assets/images/mainLogoDark.webp';
import { Google as GoogleIcon } from '@components/index';
import * as Style from './styles';

const { redirectBaseUrl, google } = envConfig.oauth;

const googleOAuthURL = `${google.baseUrl}?client_id=${google.clientId}&redirect_uri=${redirectBaseUrl}/google/callback&response_type=code&scope=${google.scope}`;

export default function Auth() {
	const { pathname } = useLocation();
	const prevPathInfo = encodeURIComponent(JSON.stringify({ prevPath: pathname }));
	const [currentTheme] = useThemeMode();
	const logoSrc = currentTheme === 'light' ? mainLogoLight : mainLogoDark;

	return (
		<Style.PageContainer>
			<Style.HeaderContainer flexDirection="column" alignItems="center">
				<img src={logoSrc} alt={`main logo ${currentTheme}`} width={96} height={63} />
				<header>환영합니다!</header>
			</Style.HeaderContainer>
			<Style.ButtonContainer>
				<Style.Button
					as="a"
					href={`${googleOAuthURL}&state=${prevPathInfo}`}
					color="#fff"
					bgColor="#DC4E41"
					aria-label="Google auth"
				>
					<Style.ButtonIconContainer>
						<GoogleIcon width={22} height={22} fill="#fff" />
					</Style.ButtonIconContainer>
					<Style.ButtonTextContainer>구글로 시작하기</Style.ButtonTextContainer>
				</Style.Button>
			</Style.ButtonContainer>
		</Style.PageContainer>
	);
}
