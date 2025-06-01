import { LocalStorageToken } from '../local-storage-token';
import { LocalStorageMock } from '@test-utills/mocks/system-modules';
import faker from 'faker';

type TokenValue = {
  id: string;
  caption: string;
}

const FAKE_LOCAL_STORAGE = new LocalStorageMock({});

const generateTokenValue = (): TokenValue => ({
  caption: faker.lorem.sentence(),
  id: faker.datatype.uuid()
});

describe('class \'LocalStorageToken\'', () => {
  const defaultValue = generateTokenValue();
  const storageKey = faker.lorem.word();
  let storageToken: LocalStorageToken<TokenValue>;

  beforeAll(() => {
    window.localStorage = FAKE_LOCAL_STORAGE;
  });

  beforeEach(() => {
    storageToken = new LocalStorageToken<TokenValue>(storageKey, defaultValue);
    FAKE_LOCAL_STORAGE.clear();
  });

  it('should creatable', () => {
    expect(storageToken).toBeInstanceOf(LocalStorageToken);
  });

  describe('method \'get\'', () => {
    it('should return default value if key not exists by storage', () => {
      const storageItem = FAKE_LOCAL_STORAGE.getItem(storageKey);
      const result = storageToken.get();

      expect(storageItem).toBeNull();
      expect(result).toEqual(defaultValue);
    });

    it('should return correct value if key exists by storage', () => {
      const fakeTokenValue = generateTokenValue();
      FAKE_LOCAL_STORAGE.setItem(storageKey, JSON.stringify(fakeTokenValue));

      const result = storageToken.get();

      expect(result).toEqual(fakeTokenValue);
    });
  });

  describe('method \'update\'', () => {
    it('should correct works if key not exists by storage', () => {
      const newFakeTokenValue = generateTokenValue();
      storageToken.update(newFakeTokenValue);

      const result = FAKE_LOCAL_STORAGE.getItem(storageKey);

      expect(result).toEqual(JSON.stringify(newFakeTokenValue));
    });

    it('should correct works if key exists by storage', () => {
      FAKE_LOCAL_STORAGE.setItem(storageKey, JSON.stringify(generateTokenValue()));

      const newFakeTokenValue = generateTokenValue();
      storageToken.update(newFakeTokenValue);

      const result = FAKE_LOCAL_STORAGE.getItem(storageKey);

      expect(result).toEqual(JSON.stringify(newFakeTokenValue));
    });
  });

  describe('method \'clear\'', () => {
    it('should delete only token value if token key not exists', () => {
      FAKE_LOCAL_STORAGE.setItem('FAKE', 'FAKE');
      const expected = FAKE_LOCAL_STORAGE.storageCopy;

      storageToken.clear();

      const item = FAKE_LOCAL_STORAGE.getItem(storageKey);

      expect(item).toBeNull();
      expect(expected).toEqual(FAKE_LOCAL_STORAGE.storageCopy);
    });

    it('should delete only token value if token key exists', () => {
      const tokenValue = generateTokenValue();
      FAKE_LOCAL_STORAGE.setItem(storageKey, JSON.stringify(tokenValue));
      FAKE_LOCAL_STORAGE.setItem('FAKE', 'FAKE');
      const expected = {
        FAKE: 'FAKE'
      };

      storageToken.clear();

      const item = FAKE_LOCAL_STORAGE.getItem(storageKey);

      expect(item).toBeNull();
      expect(expected).toEqual(FAKE_LOCAL_STORAGE.storageCopy);
    });
  });
});
