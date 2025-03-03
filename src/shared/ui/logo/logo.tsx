import { JSX } from 'react';
import { LOGO_SIZE, LogoIconLink, LogoIconClassName, LOGO_TEST_ID } from './const';
import { Link, To } from 'react-router-dom';
import classNames from 'classnames';
import { AppRoutesEnum } from '@shared/model/enums';

type LogoType = 'header' | 'footer';

type LogoProps = {
  to?: To;
  type: LogoType;
}

export function Logo({ type, to = AppRoutesEnum.Main }: LogoProps): JSX.Element {
  const linkClassName = classNames({
    [LogoIconClassName.Header]: type === 'header',
    [LogoIconClassName.Footer]: type === 'footer',
  });

  const logoLink = type === 'header' ? LogoIconLink.Header : LogoIconLink.Footer;

  return (
    <Link className={linkClassName} to={to} aria-label='Перейти на главную' data-testid={LOGO_TEST_ID}>
      <svg width={LOGO_SIZE.width} height={LOGO_SIZE.height} aria-hidden>
        <use xlinkHref={logoLink}/>
      </svg>
    </Link>
  );
}
