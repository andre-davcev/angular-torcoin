import { Convert } from './convert.interface';
import { Platform } from './platform.interface';

export interface Cryptocurrency {
  circulating_supply: number;
  cmc_rank: number;
  date_added: string;
  id: number;
  last_updated: string;
  max_supply: number;
  name: string;
  num_market_pairs: number;
  platform: Platform | null;
  quote: Record<string, Convert>;
  slug: string;
  symbol: string;
  tags: Array<string>;
  total_supply: number;
}
