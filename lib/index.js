'use strict';

// MODULES //

var isArray = require( 'validate.io-array' ),
	isObject = require( 'validate.io-object' ),
	isBoolean = require( 'validate.io-boolean-primitive' ),
	isPositiveInteger = require( 'validate.io-positive-integer' ),
	isFunction = require( 'validate.io-function' );

// MMAX //

/**
* FUNCTION: mmax( arr , window[, options] )
*	Computes a moving maximum over a numeric array.
*
* @param {Array} arr - array of data values
* @param {Number} window - size of moving window
* @param {Object} [options] - function options
* @param {Function} [options.accessor] - accessor function for accessing numeric values
* @param {Boolean} [options.copy=true] - boolean indicating whether to return a new array of window minima
* @returns {Array} array of maximum values
*/
function mmax( arr , W, opts ) {

	var copy = true,
		clbk;

	if ( !isArray( arr ) ) {
		throw new TypeError( 'mmax()::invalid input argument. Must provide an array.' );
	}
	if ( !isPositiveInteger( W ) ) {
		throw new TypeError( 'mmax()::invalid input argument. Window must be a positive integer. Value: `' + W + '`.' );
	}
	if ( arguments.length > 2 ) {
		if ( !isObject( opts ) ) {
			throw new TypeError( 'mmax()::invalid input argument. Options must be an object. Value: `' + opts + '`.' );
		}
		if ( opts.hasOwnProperty( 'accessor' ) ) {
			clbk = opts.accessor;
			if ( !isFunction( clbk ) ) {
				throw new TypeError( 'mmax()::invalid option. Accessor option must be a function. Value: `' + clbk + '`.' );
			}
		}
		if ( opts.hasOwnProperty( 'copy' ) ) {
			copy = opts.copy;
			if ( !isBoolean( copy ) ) {
				throw new TypeError( 'mmax()::invalid option. Copy option must be a boolean primitive. Value: `' + copy + '`.' );
			}
		}
	}

	if ( W > arr.length ) {
		throw new TypeError( 'mmax()::invalid input argument. Window cannot exceed array length.' );
	}
	var len = arr.length,
		out,
		max,
		val,
		i, j, k, n;

	if ( copy ) {
		out = new Array( len - W + 1 );
	} else {
		out = arr;
	}

	if ( clbk ) {
		max = clbk( arr[ 0 ], 0 );
		// Compute the maximum value for the first window...
		for ( i = 1; i < W; i++ ) {
			val = clbk( arr[ i ], i );
			if ( val > max ) {
				max = val;
			}
		}
		out[ 0 ] = max;

		// Compute the remaining window maximums...
		for ( j = W; j < len; j++ ) {
			val = clbk( arr[ j ], j );
			k = j - W;

			// Cases:
			// [1] Incoming value is greater than current maximum. New maximum value.
			// [2] Outgoing value is the current maximum and the new value is less than the maximum. Find a new maximum among the current values.
			// [3] Maximum does not change. Move along.

			if ( val > max ) {
				max = val;
			}
			else if ( clbk( arr[ k ], k ) === max && val < max ) {
				max = clbk( arr[ k+1 ], k+1 );
				for ( n = k+2; n <= j; n++ ) {
					val = clbk( arr[ n ], n);
					if ( val > max ) {
						max = val;
					}
				}
			}
			out[ k+1 ] = max;
		}
		// Trim the output array
		out.length = len - W + 1;
		return out;
	} else {
		max = arr[ 0 ];
		// Compute the maximum value for the first window...
		for ( i = 1; i < W; i++ ) {
			val = arr[ i ];
			if ( val > max ) {
				max = val;
			}
		}
		out[ 0 ] = max;

		// Compute the remaining window maximums...
		for ( j = W; j < len; j++ ) {
			val = arr[ j ];
			k = j - W;

			// Cases:
			// [1] Incoming value is greater than current maximum. New maximum value.
			// [2] Outgoing value is the current maximum and the new value is less than the maximum. Find a new maximum among the current values.
			// [3] Maximum does not change. Move along.

			if ( val > max ) {
				max = val;
			}
			else if ( arr[ k ] === max && val < max ) {
				max = arr[ k+1 ];
				for ( n = k+2; n <= j; n++ ) {
					val = arr[ n ];
					if ( val > max ) {
						max = val;
					}
				}
			}
			out[ k+1 ] = max;
		}
		// Trim the output array
		out.length = len - W + 1;
		return out;
	}
} // end FUNCTION mmax()


// EXPORTS //

module.exports = mmax;
