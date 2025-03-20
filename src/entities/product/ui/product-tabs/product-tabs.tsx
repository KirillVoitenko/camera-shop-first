import { Product } from '@entities/product/model/types';
import classNames from 'classnames';
import { JSX, useState } from 'react';
import { ProductCharacteristics } from '../product-characteristics';

type CardTab = 'characteristics' | 'description';

type ProductTabsProps = {
  product: Product;
  selectedTab?: CardTab;
}

const getTabStyles = (isActiveTab: boolean, baseSelector: string) => classNames(
  baseSelector,
  {
    'is-active': isActiveTab
  }
);

export function ProductTabs({ product, selectedTab = 'characteristics' }: ProductTabsProps): JSX.Element {
  const [activeTab, setActiveTab] = useState<CardTab>(selectedTab);

  return (
    <div className='tabs product__tabs' data-testid='product-tabs-container'>
      <div className='tabs__controls product__tabs-controls'>
        <button
          className={getTabStyles(activeTab === 'characteristics', 'tabs__control')}
          type='button'
          onClick={() => setActiveTab('characteristics')}
        >
          Характеристики
        </button>
        <button
          className={getTabStyles(activeTab === 'description', 'tabs__control')}
          type='button'
          onClick={() => setActiveTab('description')}
        >
          Описание
        </button>
      </div>
      <div className='tabs__content'>
        <div className={getTabStyles(activeTab === 'characteristics', 'tabs__element')}>
          <ProductCharacteristics product={product} viewType='page' />
        </div>
        <div className={getTabStyles(activeTab === 'description', 'tabs__element')}>
          <div className='product__tabs-text'>
            <p data-testid='product-description'>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
