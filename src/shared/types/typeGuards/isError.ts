import {IError} from '..';

export function isError(error: unknown): error is IError {
  return (
    typeof error !== 'object' &&
    (error as IError).code !== undefined &&
    (error as IError).message !== undefined
  );
}
