import { JSX, PropsWithChildren } from 'react';
import { Classed } from '@shared/model/style-types';
import classNames from 'classnames';

type FooterProps = Classed<PropsWithChildren>;

export function Footer({ children, className }: FooterProps): JSX.Element {
  const footerClassName = classNames('footer', className);
  return (
    <footer className={footerClassName}>
      {children}
    </footer>
  );
}
