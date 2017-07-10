/**
 * @flow
 */

export type HookCallback = ((args: string) => void);

export interface HookInterface {
  apply: () => void;
}
