import { ActionsAuth } from './auth.actions.enum';

export class ActionAuthWatchToken { static readonly type = ActionsAuth.WatchToken; constructor() {} }
export class ActionAuthWatchFirebase { static readonly type = ActionsAuth.WatchFirebase; constructor() {} }
export class ActionAuthLogout { static readonly type = ActionsAuth.Logout; constructor() {} }
