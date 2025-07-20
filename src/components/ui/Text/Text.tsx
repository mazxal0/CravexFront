import { FC, ReactNode } from 'react';

interface ErrorTextProps {
  children: ReactNode;
  type?: 'div' | 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const style = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'var(--error-color)',
};

export const ErrorText: FC<ErrorTextProps> = ({ children, type }) => {
  switch (type) {
    case 'span':
      return <span style={style}>{children}</span>;
    case 'p':
      return <p style={style}>{children}</p>;
    case 'h1':
      return <h1 style={style}>{children}</h1>;
    default:
      return <div style={style}>{children}</div>;
  }
};
