import Logform from "logform";

declare class RemoveToken extends Logform.Format {
	// constructor(opts?: config): RemoveToken;
	urlReg: RegExp;
	config: RemoveTokenConfig;
}

interface RemoveTokenConfig {
	/**
	 * Telegram bot api root, without /.
	 */
	apiRoot?: string;
	/**
	 * Remove full api url instead of remove api token.
	 */
	removeFullApiUrl?: boolean;
}

declare function removeToken( options?: RemoveTokenConfig ): RemoveToken;

export = removeToken;
