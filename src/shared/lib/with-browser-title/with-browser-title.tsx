import { ComponentType, FC } from 'react';
import { Helmet } from 'react-helmet-async';

type BasePropsType = Partial<Record<string, unknown>>;

export const withBrowserTitle = <TPropsType extends BasePropsType>(Component: ComponentType<TPropsType>, title: string): FC<TPropsType> => {
  const ReturnedComponent: FC<TPropsType> = (props: TPropsType) => (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Component {...props} />
    </>
  );

  return ReturnedComponent;
};
