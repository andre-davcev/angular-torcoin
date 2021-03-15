import { Cryptocurrency, StatusList } from '../interfaces';

export interface ResponseCryptocurrency {
  data: Array<Cryptocurrency>;
  status: StatusList;
}
