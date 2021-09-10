import { createGlobalStyle, DefaultTheme } from 'styled-components';
import reset from 'styled-reset';

interface IGlobalStylesProps {
  theme: {
    bgColor: string;
  };
}

export const lightTheme: DefaultTheme = {
  fontColor: '#2c2c2c',
  bgColor: 'lightGray',
};

export const darkTheme: DefaultTheme = {
  fontColor: 'lightGray',
  bgColor: '#2c2c2c',
};

export const GlobalStyles = createGlobalStyle<IGlobalStylesProps>`
  ${reset}
  body{
    background-color:${(props) => props.theme.bgColor}
  }
`;
