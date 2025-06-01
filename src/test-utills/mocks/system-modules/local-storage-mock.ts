import { Nullable } from '@shared/model/utill-types';

export class LocalStorageMock implements Storage {
  private values: Record<string, string>;

  public constructor(initial: Record<string, string>) {
    this.values = initial;
  }

  public get storageCopy(): Record<string, string> {
    return structuredClone(this.values);
  }

  public getItem(key: string): Nullable<string> {
    return key in this.values ? this.values[key] : null;
  }

  public removeItem(key: string): void {
    if (key in this.values) {
      delete this.values[key];
    }
  }

  public clear(): void {
    this.values = {};
  }

  public key(index: number): Nullable<string> {
    const keys = Object.keys(this.values);
    return (index <= keys.length && index >= 0) ? keys[index] : null;
  }

  public get length(): number {
    return Object.keys(this.values).length;
  }

  public setItem(key: string, value: string): void {
    this.values[key] = value;
  }
}
