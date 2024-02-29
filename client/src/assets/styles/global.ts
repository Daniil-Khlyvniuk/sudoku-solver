import { createGlobalStyle } from 'styled-components'
import styledNormalize from 'styled-normalize'
import { colors } from './colors'


const GlobalStyles = createGlobalStyle`
    ${ styledNormalize }
    * {
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
    }

    html {
        font-size: 14px;
        background-color: ${ colors.regular_gray };
    }

    body {
        font-family: 'Arial', sans-serif;
    }

    .MuiTabs-indicator {
        background: ${ colors.medium_secondary } !important;,
    }
`

export default GlobalStyles
