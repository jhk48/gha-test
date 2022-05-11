import { IconProps } from '@types';
import SVG from '../SVG';

export default function Search({ width = 32, height = 32, fill = 'primary' }: IconProps) {
	return (
		<SVG width={width} height={height} viewBox="0 0 1024 1024" fill={fill} aria-label="icon">
			<path
				d="M896 896L704.597 704.256L896 896ZM810.667 448C810.667 544.185 772.457 636.431 704.444 704.444C636.431 772.457 544.185 810.667 448 810.667C351.815 810.667 259.569 772.457 191.556 704.444C123.543 636.431 85.3333 544.185 85.3333 448C85.3333 351.815 123.543 259.569 191.556 191.556C259.569 123.543 351.815 85.3333 448 85.3333C544.185 85.3333 636.431 123.543 704.444 191.556C772.457 259.569 810.667 351.815 810.667 448V448Z"
				strokeWidth="64"
				strokeLinecap="round"
			/>
		</SVG>
	);
}
