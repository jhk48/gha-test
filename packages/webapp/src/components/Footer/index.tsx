import styled from 'styled-components';

export default function Footer() {
	return (
		<FooterStyle>
			<p>
				데이터 제공자:{' '}
				<a href="https://iexcloud.io/" target="_blank" rel="noreferrer">
					IEX CLOUD
				</a>
				,&nbsp;
				<a href="https://site.financialmodelingprep.com/" target="_blank" rel="noreferrer">
					Financial Modeling Prep
				</a>
			</p>
			<p>이메일: iamjaehyeon48@gmail.com</p>
		</FooterStyle>
	);
}

const FooterStyle = styled.footer`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;
	background-color: var(--footer-bg-color);
	padding: 20px;
	font-size: 14px;

	& a {
		color: var(--gray);
		&:visited {
			color: var(--gray);
		}
	}
`;
