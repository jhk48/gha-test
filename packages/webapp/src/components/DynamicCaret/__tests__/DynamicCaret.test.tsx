import { render, screen } from '@testing-library/react';
import DynamicCaret from '../index';

test('Should render caret up (like ▲) icon when the given value is greater than 0', () => {
	render(<DynamicCaret value={1} />);

	expect(screen.getByLabelText('caret up icon')).toBeInTheDocument();
});

test('Should render caret up (like ▼) icon when the given value is less than 0', () => {
	render(<DynamicCaret value={-1} />);

	expect(screen.getByLabelText('caret down icon')).toBeInTheDocument();
});

test('Should render nothing when the given value is 0', () => {
	render(<DynamicCaret value={0} />);

	expect(screen.queryByLabelText('caret up icon')).not.toBeInTheDocument();
	expect(screen.queryByLabelText('caret down icon')).not.toBeInTheDocument();
});
