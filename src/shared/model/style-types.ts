import { CSSProperties } from 'react';

export type Classed<TSourceType> = TSourceType & {
  className?: string;
}

export type Styled<TSourceType> = TSourceType & {
  style?: CSSProperties;
};

export type ClassedAndStyled<TSourceType> = Classed<TSourceType> & Styled<TSourceType>;
