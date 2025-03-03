import { JSX, PropsWithChildren, ReactNode } from 'react';
import { Classed } from '@shared/model/style-types';

type ContentProps = Classed<PropsWithChildren<{
  subHeader?: ReactNode;
}>>;

export function Content({ children, className, subHeader }: ContentProps): JSX.Element {
  return (
    <main className={className}>
      {subHeader}
      {children}
    </main>
  );
}
