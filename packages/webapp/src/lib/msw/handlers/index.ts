import { rest } from 'msw';
import envConfig from '@configs/env';
import * as portfolioMock from './portfolio';
import * as stockMock from './stock';
import * as userMock from './user';

const handlers = [
	rest.get(`${envConfig.apiServerUrl}/portfolios`, portfolioMock.getPortfolioList),
	rest.get(`${envConfig.apiServerUrl}/portfolios/default`, portfolioMock.getDefaultPortfolio),
	rest.get(`${envConfig.apiServerUrl}/portfolios/1/holdings`, portfolioMock.getAllHoldings),
	rest.get(
		`${envConfig.apiServerUrl}/portfolios/1/holdings/AAPL`,
		portfolioMock.getStockTransactionLogs
	),
	rest.post(`${envConfig.apiServerUrl}/portfolios`, portfolioMock.createPortfolio),
	rest.put(`${envConfig.apiServerUrl}/portfolios/default`, portfolioMock.editDefaultPortfolio),
	rest.patch(`${envConfig.apiServerUrl}/portfolios/1/name`, portfolioMock.editPortfolioName),
	rest.patch(`${envConfig.apiServerUrl}/portfolios/1/privacy`, portfolioMock.editPortfolioPrivacy),
	rest.delete(`${envConfig.apiServerUrl}/portfolios/1`, portfolioMock.deletePortfolio),
	rest.get(`${envConfig.apiServerUrl}/stock/market/status`, stockMock.checkIsMarketOpen),
	rest.get(`${envConfig.apiServerUrl}/stock/query`, stockMock.searchTickers),
	rest.get(`${envConfig.apiServerUrl}/stock/query/sectors`, stockMock.getSectors),
	rest.get(`${envConfig.apiServerUrl}/stock/query/company-name`, stockMock.getCompanyName),
	rest.get(`${envConfig.apiServerUrl}/stock/query/exchange`, stockMock.getExchangeName),
	rest.get(`${envConfig.apiServerUrl}/user/avatar`, userMock.getAvatar),
	rest.get(`${envConfig.apiServerUrl}/user/profile`, userMock.getUserProfile),
	rest.put(`${envConfig.apiServerUrl}/user/profile`, userMock.editUserProfile)
];

export default handlers;
