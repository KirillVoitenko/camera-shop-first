import { FC, PropsWithChildren } from 'react';
import classNames from 'classnames';
import { Classed } from '@shared/model/style-types';
import { Header } from '../header';
import { Footer } from '../footer';
import { Content } from '../content';

type LayoutProps = Classed<PropsWithChildren>;

type LayoutExtensions = {
  Header: typeof Header;
  Content: typeof Content;
  Footer: typeof Footer;
}

export const Layout: FC<LayoutProps> & LayoutExtensions = ({ className, children }: LayoutProps) => {
  const layoutClassName = classNames('wrapper', className);

  return (
    <div className={layoutClassName} data-testid='layout-container'>
      {children}
    </div>
  );
};

Layout.Header = Header;
Layout.Content = Content;
Layout.Footer = Footer;
