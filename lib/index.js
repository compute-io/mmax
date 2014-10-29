/**
*
*	COMPUTE: mmax
*
*
*	DESCRIPTION:
*		- Computes a moving maximum over a numeric array.
*
*
*	NOTES:
*		[1] 
*
*
*	TODO:
*		[1] 
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Rebekah Smith.
*
*
*	AUTHOR:
*		Rebekah Smith. rebekahjs17@gmail.com. 2014.
*
*/

(function() {
	'use strict';

    /**
	* FUNCTION: mmax( arr , window )
	*	Computes a moving maximum over a numeric array.
	*
	* @param {Array} arr - array of data values
	* @param {Number} window - size of moving window
	* @returns {Array} array of maximum values
	*/
	function mmax( arr , W ) {
		if ( !Array.isArray( arr ) ) {
			throw new TypeError( 'mmax()::invalid input argument. Must provide an array.' );
		}
		if ( typeof W !== 'number' || W !== W ) {
            throw new TypeError( 'mmax()::invalid input argument. Window must be numeric.' );
        }
        if ( Math.floor( W ) !== W || W < 1 ) {
            throw new TypeError( 'mmax()::invalid input argument. Window must be a positive integer.' );
        }
		if ( W > arr.length ) {
			throw new TypeError( 'mmax()::invalid input argument. Window cannot exceed array length.' );
		}
		var len = arr.length,
			out = new Array( len-W+1 ),
			max = arr[ 0 ],
			val,
			i, j, k, n;

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
		return out;
	} // end FUNCTION mmax()


	// EXPORTS //

	module.exports = mmax;

})();