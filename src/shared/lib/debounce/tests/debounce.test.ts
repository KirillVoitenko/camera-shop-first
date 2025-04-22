import { debounce } from '../debounce';

vi.useFakeTimers();
const timeoutSpy = vi.spyOn(global, 'setTimeout');
const callback = vi.fn<[number?], void>();
const delay = 500;

describe('function \'debounce\'', () => {
  beforeEach(() => {
    callback.mockReset();
  });

  it('should correct works', () => {
    const debounced = debounce(callback, delay);

    debounced();

    expect(timeoutSpy).lastCalledWith(expect.any(Function), delay);
    expect(callback).not.toBeCalled();

    vi.runOnlyPendingTimers();

    expect(callback).toBeCalledTimes(1);
  });

  it('should skip calls with pending timeout', () => {
    const debounced = debounce(callback, delay);
    const callsCount = 5;
    debounced();

    for(let index = 0; index <= callsCount; index++) {
      debounced(index);
    }

    vi.runOnlyPendingTimers();

    expect(callback).toBeCalledTimes(1);
    expect(callback).toBeCalledWith(callsCount);
  });
});
