import styled from 'styled-components';

interface SkeletonStyleProps {
	width?: string;
	height?: string;
}

const Skeleton = styled.div<SkeletonStyleProps>`
	width: ${({ width }) => width ?? '100%'};
	height: ${({ height }) => height ?? '100%'};
	margin: 0 auto;
	border-radius: 4px;
	background: var(--skeleton-gradient);
	background-size: 300%;
	animation: skeleton-loading 1.5s ease infinite;

	@keyframes skeleton-loading {
		0% {
			background-position: 100% 50%;
		}

		100% {
			background-position: 0 50%;
		}
	}
`;

export default Skeleton;
