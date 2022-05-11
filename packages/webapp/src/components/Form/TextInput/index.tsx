import { ChangeEventHandler } from 'react';
import { ExclamationMark } from '@components/index';
import * as Style from '../styles';

type TextInputType =
	| 'email'
	| 'number'
	| 'password'
	| 'search'
	| 'tel'
	| 'text'
	| 'url'
	| 'date'
	| 'datetime-local';

interface Props {
	htmlFor: string;
	type?: TextInputType;
	labelName?: string;
	errorLabel?: string;
	value?: string | number;
	readOnly?: boolean;
	placeholder?: string;
	handleChange?: ChangeEventHandler;
	isError?: boolean | (() => boolean);
}

export default function TextInput({
	htmlFor,
	type = 'text',
	labelName,
	errorLabel,
	value,
	readOnly = false,
	placeholder,
	handleChange,
	isError
}: Props) {
	const handleError = () => {
		if (typeof isError === 'function') return isError();
		return isError;
	};

	return (
		<Style.InputContainer>
			<Style.TextInput
				id={htmlFor}
				type={type}
				value={value}
				onChange={handleChange}
				readOnly={readOnly}
				isError={handleError()}
				placeholder={placeholder}
				autoComplete="off"
			/>
			<Style.TextInputLabel htmlFor={htmlFor} isError={handleError()}>
				{labelName}
			</Style.TextInputLabel>
			{handleError() && <ExclamationMark />}
			{handleError() && <Style.ErrorLabel>{errorLabel}</Style.ErrorLabel>}
		</Style.InputContainer>
	);
}
