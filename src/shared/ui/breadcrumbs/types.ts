import { To } from 'react-router-dom';

export type Breadcrumb = {
  position: number;
  title: string;
  link: To;
  isActive?: boolean;
};
