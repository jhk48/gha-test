import styled from 'styled-components';

interface SvgStyleProps {
	width: string | number;
	height: string | number;
	fill: string;
}

const SVG = styled.svg<SvgStyleProps>`
	width: ${({ width }) => width};
	height: ${({ height }) => height};
	fill: ${({ fill }) => fill};
`;

export default SVG;
