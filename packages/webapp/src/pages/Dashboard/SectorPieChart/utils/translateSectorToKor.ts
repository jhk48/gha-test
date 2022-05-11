export default function translateSectorToKor(sector: string) {
	switch (sector) {
		case 'Accommodation and Food Services':
			return '숙박·음식 서비스';
		case 'Administrative and Support and Waste Management and Remediation Services':
			return '행정·지원·폐기물 관리 서비스';
		case 'Agriculture, Forestry, Fishing and Hunting':
			return '농업·산림·어업·수렵';
		case 'Arts, Entertainment, and Recreation':
			return '엔터테인먼트';
		case 'Basic Materials':
			return '원자재';
		case 'Communication Services':
			return '통신 서비스';
		case 'Construction':
			return '건설업';
		case 'Consumer Cyclical':
			return '임의 소비재';
		case 'Consumer Defensive':
			return '필수 소비재';
		case 'Educational Services':
			return '교육 서비스';
		case 'Energy':
			return '에너지';
		case 'ETF':
			return 'ETF';
		case 'Finance and Insurance':
			return '금융 및 보험';
		case 'Financial Services':
			return '금융 서비스';
		case 'Health Care and Social Assistance':
			return '사회 복지';
		case 'Healthcare':
			return '헬스케어';
		case 'Industrials':
			return '산업재';
		case 'Information':
			return '정보 산업';
		case 'Management of Companies and Enterprises':
			return '자산운용';
		case 'Manufacturing':
			return '제조업';
		case 'Mining, Quarrying, and Oil and Gas Extraction':
			return '채굴·채석·시추';
		case 'Other Services (except Public Administration)':
			return '기타 서비스';
		case 'Professional, Scientific, and Technical Services':
			return '전문·과학·기술 서비스';
		case 'Public Administration':
			return '공공 행정';
		case 'Real Estate':
			return '부동산';
		case 'Real Estate and Rental and Leasing':
			return '임대업';
		case 'Retail Trade':
			return '소매업';
		case 'Technology':
			return '기술';
		case 'Transportation and Warehousing':
			return '운송업';
		case 'Utilities':
			return '유틸리티';
		case 'Wholesale Trade':
			return '도매업';
		default:
			return '기타';
	}
}
