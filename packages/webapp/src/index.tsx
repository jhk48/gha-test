import React from 'react';
import ReactDOM from 'react-dom';
import App from '@src/App';
import { AppProviders } from '@components/index';
import './font.css';

if (window.matchMedia('(max-width: 1279px').matches) {
	alert('현재 모바일 환경엔 최적화되어 있지 않습니다. 빠른 시일 내에 서비스하도록 하겠습니다 🙏');
}

ReactDOM.render(
	<React.StrictMode>
		<AppProviders>
			<App />
		</AppProviders>
	</React.StrictMode>,
	document.getElementById('root')
);
