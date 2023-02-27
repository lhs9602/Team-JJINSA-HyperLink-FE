import { recipe } from '@vanilla-extract/recipes';
import * as variants from '@/styles/variants.css';

export const divider = recipe({
  base: {
    borderTop: `1px solid ${variants.color.border}`,
  },
  variants: {
    type: {
      horizontal: { display: 'block', margin: '2.2rem 0' },
      vertical: {
        display: 'inline-block',
        width: '1.2rem',
        margin: '0.8rem 0',
        transform: 'rotate(90deg)',
      },
    },
  },
});
