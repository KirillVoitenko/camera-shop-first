import { Classed } from '@shared/model/style-types';
import classNames from 'classnames';
import { JSX, PropsWithChildren } from 'react';

type HeaderProps = Classed<PropsWithChildren<{
  id?: string;
}>>;

export function Header({ className, children, id = 'header' }: HeaderProps): JSX.Element {
  const headerClassName = classNames('header', className);
  return (
    <header id={id} className={headerClassName}>
      {children}
    </header>
  );
}
