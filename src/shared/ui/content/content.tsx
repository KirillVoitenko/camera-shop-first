import { JSX, PropsWithChildren, ReactNode } from 'react';
import { Classed } from '@shared/model/style-types';
import { Breadcrumbs, Breadcrumb } from '../breadcrumbs';

type ContentProps = Classed<PropsWithChildren<{
  subHeader?: ReactNode;
  breadcrumbs?: Breadcrumb[];
}>>;

export function Content({ children, className, subHeader, breadcrumbs = [] }: ContentProps): JSX.Element {
  return (
    <main className={className}>
      {subHeader}
      <div className='page-content'>
        <Breadcrumbs crumbs={breadcrumbs}/>
        {children}
      </div>
    </main>
  );
}
