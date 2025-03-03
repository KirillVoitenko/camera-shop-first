import { ElementSize } from '@shared/model/html';
import { To } from 'react-router-dom';

export type NavigationItem = {
  id: number;
  desctription: string;
  path: To;
}

export type SocialsItem = {
  id: number;
  iconLink: string;
  size: ElementSize;
  label: string;
};
