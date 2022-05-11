import { IconProps } from '@types';
import SVG from '../SVG';

<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" />;

export default function CandleChart({ width = 40, height = 40, fill = 'primary' }: IconProps) {
	return (
		<SVG width={width} height={height} viewBox="0 0 40 40" fill={fill} aria-label="icon">
			<path d="M5 13.3334H11.6667V26.6667H5V13.3334Z" strokeWidth="3" strokeLinejoin="round" />
			<path
				d="M8.33325 26.6667V35V26.6667ZM8.33325 5V13.3333V5Z"
				strokeWidth="3"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M28.3333 13.3334H35V26.6667H28.3333V13.3334Z"
				strokeWidth="3"
				strokeLinejoin="round"
			/>
			<path
				d="M31.6667 26.6667V35V26.6667ZM31.6667 5V13.3333V5Z"
				strokeWidth="3"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M16.6667 11.6667H23.3334V25.0001H16.6667V11.6667Z"
				strokeWidth="3"
				strokeLinejoin="round"
			/>
			<path
				d="M20 25V33.3334V25ZM20 3.33337V11.6667V3.33337Z"
				strokeWidth="3"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</SVG>
	);
}
