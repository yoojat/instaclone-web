import { createGlobalStyle, DefaultTheme } from 'styled-components';
import reset from 'styled-reset';

interface IGlobalStylesProps {
  theme: {
    bgColor: string;
    fontColor: string;
  };
}

export const lightTheme: DefaultTheme = {
  accent: '#0095f6',
  bgColor: '#FAFAFA',
  fontColor: 'rgb(38, 38, 38)',
  borderColor: 'rgb(219,219,219)',
};

export const darkTheme: DefaultTheme = {
  fontColor: 'lightGray',
  bgColor: '#000',
};

export const GlobalStyles = createGlobalStyle<IGlobalStylesProps>`
  ${reset}
  input{
    all: unset;
  }

  *{
    box-sizing : border-box;
  }

  body{
    background-color: ${(props) => props.theme.bgColor};
    font-size:14px;
    font-family : 'Open Sans', sans-serif;
    color: ${(props) => props.theme.fontColor};
  }
  a{
    text-decoration: none;;
  }
`;
