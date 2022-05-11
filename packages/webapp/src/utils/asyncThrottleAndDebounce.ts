type ThrottledFunction<T extends (...args: any) => any> = (
	...args: Parameters<T>
) => Promise<ReturnType<T>>;

export default function asyncThrottleAndDebounce<T extends (...args: any) => any>(
	callback: T,
	limit: number
): ThrottledFunction<T> {
	let wait = false;
	let timer: NodeJS.Timeout;
	return async (...args: any): Promise<ReturnType<any>> => {
		clearTimeout(timer);
		timer = setTimeout(() => callback(...args), limit);
		if (!wait) {
			callback(...args);
			wait = true;
			setTimeout(() => {
				wait = false;
			}, limit);
		}
	};
}
