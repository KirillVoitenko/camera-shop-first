import { HelmetProvider } from 'react-helmet-async';

export const withHelmet = (component: JSX.Element): JSX.Element => (
  <HelmetProvider>
    {component}
  </HelmetProvider>
);
