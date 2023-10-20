import {IGifObject, IPaginationObject} from '.';

export interface IContent {
  data: IGifObject[];
  pagination: IPaginationObject;
}
