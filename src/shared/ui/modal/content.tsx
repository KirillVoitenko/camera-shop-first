import { JSX, PropsWithChildren } from 'react';

type ContentProps = PropsWithChildren<{
  title: string;
}>;

export function Content({title, children}: ContentProps): JSX.Element {
  return (
    <>
      <p className='title title--h4'>{title}</p>
      {children}
    </>
  );
}
