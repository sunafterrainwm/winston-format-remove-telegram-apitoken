const escapeRegExp = require( 'lodash' ).escapeRegExp;

class RemoveToken {
	constructor( options ) {
		this.options = options || {};
		this.options.apiRoot = options.apiRoot || 'https://api.telegram.org';
		this.options.apiRoot = options.apiRoot.replace( /\/$/, '' );
		this.urlReg = new RegExp( '\\b' + escapeRegExp( options.apiRoot ).replace( /^https?:/, 'https?:' ) + '(\\/file)?\\/bot(\\d+:[^\\/]+)\\/([^\\s]+)\\b', 'g' );
	}

	transform( info ) {
		const that = this;
		info.message = info.message.replace( this.urlReg, function ( _, fileUrl, _token, method ) {
			if ( that.options.removeFullApiUrl ) {
				return '<tgApi>';
			} else {
				return `${that.options.apiRoot}${fileUrl || ''}/bot<tgBotToken>/${method}`;
			}
		} );
		return info;
	}
}

function createFormat( options ) {
	return new RemoveToken( options );
}

createFormat.Format = RemoveToken;

module.exports = createFormat;
