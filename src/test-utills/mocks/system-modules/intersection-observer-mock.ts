export const intersectionObserverMock = vi.fn();
intersectionObserverMock.mockReturnValue({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
});
