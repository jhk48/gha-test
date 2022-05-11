import { IconProps } from '@types';
import SVG from '../SVG';

export default function ArrowBack({ width = 24, height = 24, fill = 'primary' }: IconProps) {
	return (
		<SVG
			width={width}
			height={height}
			viewBox="0 0 24 24"
			fill={fill}
			aria-label="icon"
			preserveAspectRatio="xMidYMid meet"
		>
			<g
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
			>
				<path d="m8 5l-5 5l5 5" />
				<path d="M3 10h8c5.523 0 10 4.477 10 10v1" />
			</g>
		</SVG>
	);
}
