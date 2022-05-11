import * as Style from './styles';

interface Props {
	logOutFn: any;
}

export default function NavbarDropdown({ logOutFn }: Props) {
	return (
		<Style.DropdownContainer>
			<Style.ProfilePageLink to="/profile">프로필 설정</Style.ProfilePageLink>
			<Style.DropdownButton type="button" aria-label="Logout" onClick={logOutFn}>
				로그아웃
			</Style.DropdownButton>
		</Style.DropdownContainer>
	);
}
