import { ResponseCryptocurrency } from '../../responses';

export interface StatePricesModel {
  response: ResponseCryptocurrency | null;
  page: number;
  pageSize: number;
  loading: boolean;
  errored: boolean;
}
