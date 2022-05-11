import { createGlobalStyle } from 'styled-components';
import { GLOBAL_SCROLLBAR_WIDTH } from '@constants/index';
import { flexMixin } from '../Mixins';

export default createGlobalStyle`
  html {
    /* Color */
    --colorBaseWhite: 0, 0%;
    --colorBaseBlueGray: 210, 17%;
    --colorBaseDarkGray: 214, 7%;
    --colorBaseGreen: 162, 90%;
    --colorBaseDeepGreen: 157, 100%;
    --colorBaseRed: 350, 80%;
    --colorBaseDeepRed: 4, 100%;
    --colorBaseLightBlue: 209, 100%;
    --colorBaseDeepBlue: 223, 100%;
    --colorBaseDeepPurple: 271, 100%;
    --colorBaseDeepOrange: 36, 100%;
    --white: hsla(0, 0%, 100%);
    --dark: hsla(0, 0%, 0%);
    --primary: hsla(var(--colorBaseGreen), 35%);
    --deepRed: hsla(var(--colorBaseDeepRed), 40%);
    --lightBlue: hsla(var(--colorBaseLightBlue), 50%);
    --deepBlue: hsla(var(--colorBaseDeepBlue), 45%);
    --deepOrange: hsla(var(--colorBaseDeepOrange), 45%);

    /* Box-Shadow */
    --boxShadowDimension: 1px 1px 3px 1px;
  }

  html[data-theme='light'] {
    /* Global */
    --baseTextColor: var(--dark);
    --bodyBgColor: hsla(var(--colorBaseBlueGray), 98%);
    --globalScrollBarThumbBgColor: hsla(var(--colorBaseBlueGray), 68%);
    --globalScrollBarThumbBgColorHover: hsla(var(--colorBaseBlueGray), 53%);
    --globalScrollBarTrackBgColor: hsla(var(--colorBaseBlueGray), 93%);
    --scrollBarThumbBgColor: hsla(var(--colorBaseBlueGray), 83%, 45%);
    --baseBorderColor: hsla(var(--colorBaseBlueGray), 67%);
    --priceGreen: hsla(var(--colorBaseDeepGreen), 27%);
    --priceRed: hsla(var(--colorBaseDeepRed), 42%);
    --lightGray: hsla(var(--colorBaseDarkGray), 80%);
    --gray: hsla(var(--colorBaseDarkGray), 60%);
    --darkGray: hsla(var(--colorBaseDarkGray), 40%);
    --deepDarkGray: hsla(var(--colorBaseDarkGray), 19%);

    /* Navbar */
    --navbarBgColor: var(--white);
    --navbarDropdownBorderColor: hsla(var(--colorBaseBlueGray), 70%);
    --navbarIconBgColor: hsla(var(--colorBaseBlueGray), 60%);

    /* Card */
    --cardBgColor: var(--white);
    --cardHoverBgColor: hsla(var(--colorBaseBlueGray), 90%);
    --cardBoxShadow: var(--boxShadowDimension) hsla(var(--colorBaseBlueGray), 0%, 0.1);

    /* Home Page */
    --indexCardHeaderBorderColor: hsla(var(--colorBaseBlueGray), 78%);

    /* Stock Page */
    --stockPageBorderColor: hsla(var(--colorBaseBlueGray), 85%);
    --stockPageTextSubColor: hsla(var(--colorBaseBlueGray), 42%);

    /* Modal */
    --modalBackdropColor: hsla(var(--colorBaseBlueGray), 90%, 50%);
    --modalCloseIconColor: var(--darkGray);

    /* Input */
    --inputBgColor: var(--white);
    --inputLabelColor: var(--darkGray);

    /* Portfolios Page */
    --filterButtonBgColor: hsla(var(--colorBaseDeepPurple), 61%);

    /* Search Stock */
    --searchStockItemBorderColor: hsla(var(--colorBaseWhite), 94%);
    --searchStockHoverBgColor: hsla(var(--colorBaseWhite), 96%);

    /* Avatar Picker */
    --deleteConfirmBgColor: hsla(var(--colorBaseDarkGray), 93%);

    /* Dashboard */
    --dashboardItemIconBgColorGray: hsla(var(--colorBaseBlueGray), 70%);
    --dashboardItemIconBgColorBlue: hsla(210, 30%, 60%);
    --dashboardDetailsPageRatioBar: linear-gradient(
		  90deg,
		  rgba(42, 170, 9, 0.6) 0%,
		  rgba(9, 170, 121, 0.6) 50%,
		  rgba(9, 170, 160, 0.6) 100%
	  );
    --openDetailsPageButtonColor: var(--gray);

    /* Footer */
    --footer-bg-color: hsla(var(--colorBaseBlueGray), 90%);

    /* Skeleton */
    --skeleton-gradient: linear-gradient(
      90deg,
      rgba(190, 190, 190, 0.4) 25%,
      rgba(173, 170, 170, 0.65) 50%,
      rgba(190, 190, 190, 0.4) 25%
    )
  }

  html[data-theme='dark'] {
    /* Global */
    --baseTextColor: var(--white);
    --bodyBgColor: hsla(var(--colorBaseBlueGray), 12%);
    --globalScrollBarThumbBgColor: hsla(var(--colorBaseBlueGray), 42%);
    --globalScrollBarThumbBgColorHover: hsla(var(--colorBaseBlueGray), 57%);
    --globalScrollBarTrackBgColor: hsla(var(--colorBaseBlueGray), 17%);
    --scrollBarThumbBgColor: hsla(var(--colorBaseBlueGray), 40%, 50%);
    --baseBorderColor: hsla(var(--colorBaseBlueGray), 34%);
    --priceGreen: hsla(var(--colorBaseDeepGreen), 36%);
    --priceRed: hsla(var(--colorBaseRed), 55%);
    --lightGray: hsla(var(--colorBaseDarkGray), 70%);
    --gray: hsla(var(--colorBaseDarkGray), 50%);
    --darkGray: hsla(var(--colorBaseDarkGray), 30%);
    --deepDarkGray: hsla(var(--colorBaseDarkGray), 13%);

    /* Navbar */
    --navbarBgColor: hsla(var(--colorBaseBlueGray), 14%);
    --navbarDropdownBorderColor: hsla(var(--colorBaseBlueGray), 25%);
    --navbarIconBgColor: hsla(var(--colorBaseBlueGray), 66%);

    /* Card */
    --cardBgColor: hsla(var(--colorBaseBlueGray), 18%);
    --cardHoverBgColor: hsla(var(--colorBaseBlueGray), 25%);
    --cardBoxShadow: none;

    /* Home Page */
    --indexCardHeaderBorderColor: hsla(var(--colorBaseBlueGray), 45%);

    /* Stock Page */
    --stockPageBorderColor: hsla(var(--colorBaseBlueGray), 35%);
    --stockPageTextSubColor: hsla(var(--colorBaseBlueGray), 63%);

    /* Modal */
    --modalBackdropColor: hsla(var(--colorBaseBlueGray), 90%, 30%);
    --modalCloseIconColor: var(--gray);

    /* Input */
    --inputBgColor: hsla(var(--colorBaseBlueGray), 17%);
    --inputLabelColor: var(--gray);

    /* Portfolios Page */
    --filterButtonBgColor: hsla(var(--colorBaseDeepPurple), 51%);

    /* Search Stock */
    --searchStockItemBorderColor: hsla(var(--colorBaseBlueGray), 20%);
    --searchStockHoverBgColor: hsla(var(--colorBaseBlueGray), 22%);

    /* Avatar Picker */
    --deleteConfirmBgColor: hsla(var(--colorBaseDarkGray), 22%);

    /* Dashboard */
    --dashboardItemIconBgColorGray: hsla(var(--colorBaseBlueGray), 38%);
    --dashboardItemIconBgColorBlue: hsla(210, 30%, 40%);
    --dashboardDetailsPageRatioBar: linear-gradient(
		  90deg,
		  rgba(58, 143, 7, 1) 0%,
		  rgba(9, 130, 94, 1) 50%,
		  rgba(8, 117, 130, 1) 100%
	  );
    --openDetailsPageButtonColor: var(--lightGray);

    /* Footer */
    --footer-bg-color: hsla(var(--colorBaseBlueGray), 18%);

    /* Skeleton */
    --skeleton-gradient: linear-gradient(
      90deg,
      rgba(190, 190, 190, 0.28) 25%,
      rgba(173, 170, 170, 0.5) 50%,
      rgba(190, 190, 190, 0.28) 25%
    )
  }

  body {
    font-family: 'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: var(--bodyBgColor);
    color: var(--baseTextColor);

    &::-webkit-scrollbar {
      width: ${GLOBAL_SCROLLBAR_WIDTH}px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: var(--globalScrollBarThumbBgColor);
      border-radius: 9px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: var(--globalScrollBarThumbBgColorHover);
    }

    &::-webkit-scrollbar-track {
      background-color: var(--globalScrollBarTrackBgColor);
    }
  }

  #root {
    position: relative;
    ${flexMixin}
  }

  #modal-root {
    position:absolute;
    z-index: 99;
  }
`;
