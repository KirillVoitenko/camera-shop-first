export interface IToken<TValueType> {
  get: () => TValueType;
  update: (newValue: TValueType) => void;
  clear: () => void;
}
