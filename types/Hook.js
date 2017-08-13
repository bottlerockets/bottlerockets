/**
 * @flow
 */
export type Hook = {
  name: string;
  apply: ((args: string) => void);
}
