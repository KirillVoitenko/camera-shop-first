import { JSX } from 'react';
import { NavigationItem } from '../../model/navigation';

type FooterNavigationItemProps = {
  title: string;
  testId: string;
  items: NavigationItem[];
  renderItem: (item: NavigationItem) => JSX.Element;
}

export function FooterNavigationItem({ items, renderItem, testId, title }: FooterNavigationItemProps): JSX.Element {
  return (
    <li className='footer__nav-item' data-testid={testId}>
      <p className='footer__title'>
        {title}
      </p>
      <ul className='footer__list'>
        {items.map((current) => renderItem(current))}
      </ul>
    </li>
  );
}
