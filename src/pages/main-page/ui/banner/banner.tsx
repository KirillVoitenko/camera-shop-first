import { JSX } from 'react';
import { BANNER_TEST_ID } from '@pages/main-page/config/const';

export function Banner(): JSX.Element {
  return (
    <div className='catalog__aside'>
      <img src='/img/banner.png' data-testid={BANNER_TEST_ID} />
    </div>
  );
}
