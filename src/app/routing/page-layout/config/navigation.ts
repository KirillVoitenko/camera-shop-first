import { AppRoutesEnum } from '@shared/model/enums';
import { NavigationItem, SocialsItem } from '../model/navigation';
import { SOCIALS_ICON_SIZE } from './const';

export enum FooterItemTitle {
  Main = 'Навигация',
  Resources = 'Ресурсы',
  Support = 'Поддержка'
}

export const MAIN_NAVIGATION_CONFIG: NavigationItem[] = [
  {
    id: 0,
    desctription: 'Каталог',
    path: AppRoutesEnum.Main
  },
  {
    id: 1,
    desctription: 'Гарантии',
    path: AppRoutesEnum.Guaranties
  },
  {
    id: 2,
    desctription: 'Доставка',
    path: AppRoutesEnum.Delivery
  },
  {
    id: 3,
    desctription: 'О компании',
    path: AppRoutesEnum.About
  }
];

export const RESOURCES_NAVIGATION_CONFIG: NavigationItem[] = [
  {
    id: 0,
    desctription: 'Курсы операторов',
    path: '#'
  },
  {
    id: 1,
    desctription: 'Блог',
    path: '#'
  },
  {
    id: 2,
    desctription: 'Сообщество',
    path: '#'
  }
];

export const SUPPORT_NAVIGATION_CONFIG: NavigationItem[] = [
  {
    id: 0,
    desctription: 'FAQ',
    path: '#'
  },
  {
    id: 1,
    desctription: 'Задать вопрос',
    path: '#'
  }
];

export const SOCIALS_NAVIGATION_CONFIG: SocialsItem[] = [
  {
    id: 0,
    iconLink: '#icon-vk',
    label: 'Переход на страницу вконтакте',
    size: SOCIALS_ICON_SIZE
  },
  {
    id: 1,
    iconLink: '#icon-pinterest',
    label: 'Переход на страницу pinterest',
    size: SOCIALS_ICON_SIZE
  },
  {
    id: 2,
    iconLink: '#icon-reddit',
    label: 'Переход на страницу reddit',
    size: SOCIALS_ICON_SIZE
  }
];
