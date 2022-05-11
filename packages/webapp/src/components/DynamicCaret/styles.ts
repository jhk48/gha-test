import styled from 'styled-components';

interface CaretContainerProps {
	marginTop: number;
}

const CaretContainer = styled.div<CaretContainerProps>`
	display: inline-block;
	margin-top: ${({ marginTop }) => marginTop}px;
`;

export default CaretContainer;
