import { style } from '@vanilla-extract/css';
import * as utils from '@/styles/utils.css';
import * as keyframes from '@/styles/keyframes.css';

export const wrapper = style({
  animation: `500ms ${keyframes.slideFromRightToLeft}`,
});

export const form = style([
  utils.flexColumn,
  {
    gap: '2.4rem',
    paddingTop: '1rem',
  },
]);

export const buttonContainer = style([
  utils.flex,
  utils.fullWidth,
  {
    paddingTop: '4rem',
    gap: '1rem',
  },
]);

export const categoryContainer = style([
  {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '1.6rem',
    padding: '4rem 2.4rem',
  },
]);
