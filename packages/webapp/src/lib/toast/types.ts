export type MessageType = 'success' | 'warning' | 'error' | 'info';
export type ToastPosition =
	| 'topLeft'
	| 'topRight'
	| 'topCenter'
	| 'bottomLeft'
	| 'bottomRight'
	| 'bottomCenter';
export type Theme = 'light' | 'dark';

interface ToastStyle {
	bgColor: string;
	progressBarColor: string;
	color: string;
}

export interface ToastStyles {
	success: ToastStyle;
	warning: ToastStyle;
	error: ToastStyle;
	info: ToastStyle;
}

export interface Message {
	id: string;
	message: string;
	type: MessageType;
	duration: number;
}

interface ToastPositionValues {
	left?: string;
	right?: string;
	top?: string;
	bottom?: string;
	translateX?: string;
}

export type ToastPositions = {
	[key in ToastPosition]: ToastPositionValues;
};
