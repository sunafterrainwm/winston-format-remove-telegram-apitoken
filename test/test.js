// eslint-disable-next-line spaced-comment
/// <reference types="mocha" />

const assert = require( 'assert' );
const removeToken = require( '../' )( {
	apiRoot: 'http://localhost:8000'
} );
const removeTokenFullUrl = require( '../' )( {
	apiRoot: 'http://localhost:8000',
	removeFullApiUrl: true
} );

describe( 'removeToken', function () {
	it( 'should remove token from string', function () {
		const info = {
			level: 'info',
			message: 'Connect to http://localhost:8000/bot123456789:abcefghijk/getMe ......'
		};
		removeToken.transform( info );
		assert.equal( info.message, 'Connect to http://localhost:8000/bot<tgBotToken>/getMe ......' );
	} );

	it( 'should remove Fullurl from string', function () {
		const info = {
			level: 'info',
			message: 'Connect to http://localhost:8000/bot123456789:abcefghijk/getMe?data=1 ......'
		};
		removeTokenFullUrl.transform( info );
		assert.equal( info.message, 'Connect to <tgApi> ......' );
	} );
} );
