import { IconProps } from '@types';
import SVG from '../SVG';

export default function Plus({ width = 32, height = 32, fill = 'primary' }: IconProps) {
	return (
		<SVG width={width} height={height} viewBox="0 0 1024 1024" fill={fill} aria-label="icon">
			<path
				d="M512 512H170.667M512 853.333V512V853.333ZM512 512V170.667V512ZM512 512H853.333H512Z"
				strokeWidth="90"
				strokeLinecap="round"
			/>
		</SVG>
	);
}
