import ReactDOM from 'react-dom';
import TradingViewWidget from '../index';

// eslint-disable-next-line jest/expect-expect
test('Trading view widget renders successfully', () => {
	const div = document.createElement('div');
	ReactDOM.render(<TradingViewWidget width={100} height={100} symbol="AAPL" theme="light" />, div);
});
