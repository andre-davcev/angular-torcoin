import { Cryptocurrency } from './cryptocurrency.interface';

export interface CryptoWithMetadata extends Cryptocurrency {
  rank: number;
// name: string;
// symbol: string;
  price: number;
// quote.USD.price: number;
  change: number;
// quote.USD.percent_change_24h: number;
  marketCap: number;
// quote.USD.market_cap: number;
  favorite: boolean;
}
