import { IconProps } from '@types';
import SVG from '../SVG';

export default function SignIn({ width = 40, height = 40, fill = 'primary' }: IconProps) {
	return (
		<SVG width={width} height={height} viewBox="0 0 40 40" fill={fill} aria-label="icon">
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M27.55 9.425L27.575 9.4L30.05 11.875V6.25L28.8 5H6.3L5.025 6.25V7.4825L5 7.5V33.225L5.9 34.375L18.4 38.675L20 37.5V35H28.8L30.05 33.75V28.125L27.55 30.625V32.5H20V11.775L19.175 10.625L10.09 7.5H27.55V9.425ZM17.5 35.7L7.5 32.35V9.3L17.5 12.65V35.7ZM25.225 18.825H37.65V21.325H25.325L29.3 25.325L27.525 27.075L21.35 20.925V19.15L27.575 12.95L29.325 14.7L25.225 18.825Z"
			/>
		</SVG>
	);
}
