import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  html {
    --toastSuccessBase: 143, 88%;
    --toastWarningBase: 43, 86%;
    --toastInfoBase: 207, 90%;
    --toastErrorBase: 9, 83%;
  }

  html[data-theme='light'] {
    --toastSuccessBgColor: hsla(var(--toastSuccessBase), 40%);
    --toastSuccessProgressBarColor: hsla(var(--toastSuccessBase), 75%);
    --toastWarningBgColor: hsla(var(--toastWarningBase), 57%);
    --toastWarningProgressBarColor: hsla(var(--toastWarningBase), 29%);
    --toastWarningTextColor: hsla(var(--toastWarningBase), 6%);
    --toastInfoBgColor: hsla(var(--toastInfoBase), 50%);
    --toastInfoProgressBarColor: hsla(var(--toastInfoBase), 78%);
    --toastErrorBgColor: hsla(var(--toastErrorBase), 61%);
    --toastErrorProgressBarColor: hsla(var(--toastErrorBase), 84%);
  }

  html[data-theme='dark'] {
    --toastSuccessBgColor: hsla(var(--toastSuccessBase), 33%);
    --toastSuccessProgressBarColor: hsla(var(--toastSuccessBase), 63%);
    --toastWarningBgColor: hsla(var(--toastWarningBase), 48%);
    --toastWarningProgressBarColor: hsla(var(--toastWarningBase), 78%);
    --toastWarningTextColor: hsla(var(--toastWarningBase), 10%);
    --toastInfoBgColor: hsla(var(--toastInfoBase), 46%);
    --toastInfoProgressBarColor: hsla(var(--toastInfoBase), 82%);
    --toastErrorBgColor: hsla(var(--toastErrorBase), 52%);
    --toastErrorProgressBarColor: hsla(var(--toastErrorBase), 76%);
  }
`;
