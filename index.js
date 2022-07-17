// @ts-check
const escapeRegExp = require( 'lodash' ).escapeRegExp;
const util = require( 'util' );

const defaultApiUrl = 'https://api.telegram.org';

/**
 * @typedef RemoveTokenOptions
 * @property {string} apiRoot bot api root, without /.
 * @property {boolean} removeFullApiUrl Remove full api url instead of remove api token.
 */

/**
 * @typedef {import('logform').TransformableInfo} TransformableInfo
 */

/**
 * @param {string} apiUrl
 * @return {RegExp}
 */
function formatApiUrl( apiUrl ) {
	return new RegExp( '\\b' + escapeRegExp( apiUrl.replace( /\/$/, '' ) ).replace( /^https?:/, 'https?:' ) + '(\\/file)?\\/bot(\\d+:[^\\/]+)\\/([^\\s]+)\\b', 'g' );
}

/**
 * @param {string} string
 * @param {RemoveTokenOptions} options
 * @return {string}
 */
function deToken( string, options ) {
	// eslint-disable-next-line max-len
	return String( string ).replace( formatApiUrl( options.apiRoot ), function ( _, fileUrl, _token, method ) {
		if ( options.removeFullApiUrl ) {
			return '<tgApi>';
		} else {
			return `${options.apiRoot}${fileUrl || ''}/bot<tgBotToken>/${method}`;
		}
	} );
}

class Format {
	/**
	 * @param {RemoveTokenOptions} options
	 */
	constructor( options ) {
		/** @type {RemoveTokenOptions} */
		this.options = options || {};
		this.options.apiRoot = String( options.apiRoot || defaultApiUrl ).replace( /\/$/, '' );
	}

	/**
	 * @param {TransformableInfo} info
	 * @return {TransformableInfo}
	 */
	transform( info ) {
		if ( !info.message ) {
			const error = new Error( 'Fail to parse info json: ' + deToken( util.inspect( info ), this.options ) );
			process.nextTick( function () {
				throw error;
			} );
			return info;
		}
		info.message = deToken( String( info.message ), this.options );
		return info;
	}
}

/**
 * @param {RemoveTokenOptions} options
 * @return {Format}
 */
function createFormat( options ) {
	return new Format( options );
}

createFormat.Format = Format;
createFormat.deToken = deToken;
createFormat.defaultApiUrl = defaultApiUrl;

module.exports = createFormat;
