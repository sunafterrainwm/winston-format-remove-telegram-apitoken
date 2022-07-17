import Logform from "logform";

declare function removeToken(options?: removeToken.RemoveTokenOptions): removeToken.Format;
declare namespace removeToken {
	interface RemoveTokenOptions {
		/**
		 * Telegram bot api root, without /.
		 */
		apiRoot?: string;
		/**
		 * Remove full api url instead of remove api token.
		 */
		removeFullApiUrl?: boolean;
	}

	class Format extends Logform.Format {
		constructor(options?: RemoveTokenOptions);
		options: RemoveTokenOptions;
	}

	function deToken(string: string, options?: RemoveTokenOptions): string;

	const defaultApiUrl: string;
}

export = removeToken;
