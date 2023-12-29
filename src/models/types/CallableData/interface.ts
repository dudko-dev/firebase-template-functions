export interface CallableDataInterface {
  action: string;
  data: {
    [key: string]: unknown;
  };
  [k: string]: unknown;
}
