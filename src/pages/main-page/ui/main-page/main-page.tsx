import { Layout } from '@shared/ui/layout';
import { withBrowserTitle } from '@shared/lib/with-browser-title';
import { PAGE_TITLE } from '@pages/main-page/config/const';

function MainPage() {
  return (
    <Layout.Content>
      MainPage
    </Layout.Content>
  );
}

export const MainPageWithTitle = withBrowserTitle(MainPage, PAGE_TITLE);
