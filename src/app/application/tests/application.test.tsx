import { render } from '@testing-library/react';
import { withStore } from '@test-utills/wrappers';
import { Application } from '../application';
import faker from 'faker';

const FAKE_ROUTER_TEXT = faker.lorem.sentence();
const FAKE_TOAST_CONTAINER_TEXT = faker.lorem.sentence();
const FAKE_GLOBAL_LOADER_TEXT = faker.lorem.sentence();

const FAKE_ROUTER_PROVIDER = () => <p>{FAKE_ROUTER_TEXT}</p>;
const FAKE_TOAST_CONTAINER = () => <p>{FAKE_TOAST_CONTAINER_TEXT}</p>;
const FAKE_GLOBAL_LOADER = () => <p>{FAKE_GLOBAL_LOADER_TEXT}</p>;

describe('Component \'Application\'', () => {
  const useStartupMock = vi.fn();

  beforeEach(() => {
    useStartupMock.mockReset();
  });

  it('should correct render', async () => {
    vi.spyOn(await import('@app/routing/router-provider'), 'RouterProvider')
      .mockImplementation(FAKE_ROUTER_PROVIDER);
    vi.spyOn(await import('@shared/ui/toast-container'), 'ToastContainer')
      .mockImplementation(FAKE_TOAST_CONTAINER);
    vi.spyOn(await import('@shared/ui/global-loader'), 'GlobalLoader')
      .mockImplementation(FAKE_GLOBAL_LOADER);
    vi.spyOn(await import('../use-startup'), 'useStartup')
      .mockImplementation(useStartupMock);
    const { wrappedComponent } = withStore(<Application />);

    const screen = render(wrappedComponent);
    expect(screen.getByText(FAKE_ROUTER_TEXT)).toBeInTheDocument();
    expect(screen.getByText(FAKE_TOAST_CONTAINER_TEXT)).toBeInTheDocument();
    expect(screen.getByText(FAKE_GLOBAL_LOADER_TEXT)).toBeInTheDocument();
  });

  it('should call \'useStartup\' hook', async () => {
    vi.spyOn(await import('@app/routing/router-provider'), 'RouterProvider')
      .mockImplementation(FAKE_ROUTER_PROVIDER);
    vi.spyOn(await import('@shared/ui/toast-container'), 'ToastContainer')
      .mockImplementation(FAKE_TOAST_CONTAINER);
    vi.spyOn(await import('@shared/ui/global-loader'), 'GlobalLoader')
      .mockImplementation(FAKE_GLOBAL_LOADER);
    vi.spyOn(await import('../use-startup'), 'useStartup')
      .mockImplementation(useStartupMock);
    const { wrappedComponent } = withStore(<Application />);

    render(wrappedComponent);

    expect(useStartupMock).toBeCalled();
  });
});
