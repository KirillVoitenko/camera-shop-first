import { ElementSize } from '@shared/model/html';
import { Classed } from '@shared/model/style-types';
import classNames from 'classnames';
import { JSX, MouseEventHandler } from 'react';

type ScrollupLinkProps = Classed<{
  elementId: string;
}>

const BUTTON_SIZE: ElementSize = {
  height: 18,
  width: 12,
};

export function ScrollupLink({ elementId, className }: ScrollupLinkProps): JSX.Element {
  const linkClassName = classNames('up-btn', className);

  const linkClickHandler: MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault();

    const scrollTarget = document.querySelector(elementId);
    if (scrollTarget) {
      window.scrollBy({
        top: scrollTarget.getBoundingClientRect().top,
        behavior: 'smooth'
      });
    }
  };

  return (
    <a className={linkClassName} href='#' onClick={linkClickHandler} data-testid='scrollup-link'>
      <svg width={BUTTON_SIZE.width} height={BUTTON_SIZE.height} aria-hidden>
        <use xlinkHref='#icon-arrow2'/>
      </svg>
    </a>
  );
}
