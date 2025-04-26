import { CardTab, ProductCardSearchParams } from '../model/types';

export const SHORT_PRODUCT_CARD_TEST_ID = 'short-product-card-container';
export const FULL_PRODUCT_CARD_TEST_ID = 'full-product-card-container';
export const PRODUCT_CHARACTERISTICS_LIST_TEST_ID = 'product-characteristics-list';
export const BUY_BUTTON_TEST_ID = 'buy_button';

export const INITIAL_PRODUCT_TAB_PARAMS: ProductCardSearchParams = {
  activeTab: 'characteristics'
};

export const SUPPORTED_PRODUCT_TABS: CardTab[] = ['characteristics', 'description'];
