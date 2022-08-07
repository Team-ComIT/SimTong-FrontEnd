import { css } from '@emotion/react';

const style = css`
    * {
        font-family: 'NanumSquare';
        font-style: normal;
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
        border: 0;
        font-family: 'noto-sans-cjk-kr', sans-serif;
        outline: unset;
        list-style: none;
        font-style: normal;
    }
    button,
    label {
        cursor: pointer;
        background-color: transparent;
    }
    blockquote,
    q {
        quotes: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
    a {
        text-decoration: none;
        color: inherit;
    }
`;

export default style;
