import { Nullable } from '@shared/model/utill-types';
import { IToken } from './token';

export class LocalStorageToken<TValueType> implements IToken<TValueType> {
  private storageKey: string;
  private defaultValue: TValueType;

  constructor(storageKey: string, defaultValue: TValueType) {
    this.storageKey = storageKey;
    this.defaultValue = defaultValue;
  }

  protected get tokenValue(): Nullable<string> {
    return localStorage.getItem(this.storageKey);
  }

  public get = (): TValueType => {
    if (this.tokenValue) {
      return JSON.parse(this.tokenValue) as TValueType;
    }

    return structuredClone(this.defaultValue);
  };

  public clear = () => {
    localStorage.removeItem(this.storageKey);
  };

  public update = (newValue: TValueType) => {
    this.clear();
    localStorage.setItem(this.storageKey, JSON.stringify(newValue));
  };
}
