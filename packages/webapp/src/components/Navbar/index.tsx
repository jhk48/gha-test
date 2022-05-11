import { SyntheticEvent, useState, useEffect } from 'react';
import mainLogoLight from '@assets/images/mainLogoLight.webp';
import mainLogoDark from '@assets/images/mainLogoDark.webp';
import { AvatarImage } from '@components/index';
import * as Icon from '@components/Icon';
import { AuthPage, LogOutPage } from '@pages/index';
import { useModal, useAuth, useThemeMode } from '@hooks/index';
import NavbarDropdown from './NavbarDropdown';
import * as Style from './styles';

const navbarLogoWidth = 76;
const navbarLogoHeight = 50;

export default function Navbar() {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const { openModal } = useModal();
	const isAuthenticated = useAuth();
	const [currentTheme] = useThemeMode();
	const logoSrc = currentTheme === 'light' ? mainLogoLight : mainLogoDark;

	useEffect(() => {
		document.addEventListener('click', handleCloseNavDropdown);

		return () => {
			document.removeEventListener('click', handleCloseNavDropdown);
		};
	}, []);

	function handleOpenLogInModal(e: SyntheticEvent) {
		openModal(e, <AuthPage />);
	}

	function handleOpenLogOutModal(e: SyntheticEvent) {
		openModal(e, <LogOutPage />);
	}

	function handleOpenNavDropdown() {
		setIsDropdownOpen(true);
	}

	function handleCloseNavDropdown(e: Event) {
		const target = e.target as HTMLElement;
		if (target.closest('#nav-profile-button')) return;
		setIsDropdownOpen(false);
	}

	return (
		<Style.Container>
			<Style.Top alignItems="center" justifyContent="center">
				<Style.NavbarLink to="/">
					<img
						src={logoSrc}
						alt="Navbar main logo"
						width={navbarLogoWidth}
						height={navbarLogoHeight}
					/>
				</Style.NavbarLink>
			</Style.Top>
			<Style.Middle flexDirection="column" alignItems="center" justifyContent="space-evenly">
				{isAuthenticated && (
					<>
						<Style.NavbarLink to="/dashboard">
							<Icon.Dashboard />
							<p>대시보드</p>
						</Style.NavbarLink>
						<Style.NavbarLink to="/holdings">
							<Icon.CandleChart />
							<p>내 종목</p>
						</Style.NavbarLink>
						<Style.NavbarLink to="/portfolios">
							<Icon.List />
							<p>내 포트폴리오</p>
						</Style.NavbarLink>
						<Style.NavbarLink to="/cash">
							<Icon.Coins />
							<p>현금</p>
						</Style.NavbarLink>
					</>
				)}
			</Style.Middle>
			<Style.Bottom alignItems="center" justifyContent="center">
				{isAuthenticated ? (
					<Style.Button
						id="nav-profile-button"
						aria-label="User profile button"
						type="button"
						onClick={handleOpenNavDropdown}
					>
						<Style.ProfileImageContainer>
							<AvatarImage userIconWidth={36} userIconHeight={36} />
						</Style.ProfileImageContainer>
					</Style.Button>
				) : (
					<Style.Button type="button" onClick={handleOpenLogInModal}>
						<Icon.SignIn />
						<p>로그인</p>
					</Style.Button>
				)}
			</Style.Bottom>
			{isDropdownOpen && <NavbarDropdown logOutFn={handleOpenLogOutModal} />}
		</Style.Container>
	);
}
