import { ActionsPrices } from './prices.actions.enum';

export class ActionPricesGet { static readonly type = ActionsPrices.Get; constructor(public pageSize: number = 10) {} }
export class ActionPricesPage { static readonly type = ActionsPrices.Page; constructor() {} }
