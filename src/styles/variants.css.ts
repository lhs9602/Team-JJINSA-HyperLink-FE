import { createGlobalTheme } from '@vanilla-extract/css';

export const vars = createGlobalTheme(':root', {
  color: {
    primary: '#3772ff',
    primaryDimmed: '#3772ff30',
    secondary: '#004BFF',
    white: '#fff',
    bg: {
      tab: '#eff0f2',
      select: '#dddddd80',
    },
    border: '#c2c6cc',
    font: {
      primary: '#2a282f',
      secondary: '#787878',
    },
    icon: '#9a9a9a',
  },
  fontSize: {
    xSmall: '1.2rem',
    small: '1.4rem',
    medium: '1.6rem',
    large: '1.8rem',
    xLarge: '2.3rem',
    huge: '6rem',
  },
  space: {
    xSmall: '1rem',
    small: '2rem',
    medium: '3rem',
    large: '4rem',
    xLarge: '10rem',
  },
  font: 'Pretendard Variable',
});
