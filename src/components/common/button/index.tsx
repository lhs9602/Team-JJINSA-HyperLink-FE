import { CSSProperties } from 'react';
import * as style from './style.css';

export type ButtonProps = {
  type?: 'button' | 'submit';
  version?: 'blue' | 'gray' | 'grayInverted' | 'white';
  shape?: 'round' | 'circle';
  fontSize?: 'small' | 'medium' | 'large';
  paddingSize?: 'small' | 'medium' | 'full';
  text?: string;
  isBold?: boolean;
  onClick?: () => void;
  style?: CSSProperties;
};

const Button = ({
  type = 'button',
  version = 'blue',
  shape = 'round',
  fontSize = 'small',
  paddingSize = 'small',
  isBold = false,
  text = 'button',
  onClick,
  ...props
}: ButtonProps) => {
  const buttonStyle = {
    fontWeight: isBold ? '700' : '400',
  };

  const handleClick = () => {
    onClick && onClick();
  };

  return (
    <button
      className={style.button({ version, shape, fontSize, paddingSize })}
      type={type}
      style={{ ...buttonStyle, ...props.style }}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default Button;
