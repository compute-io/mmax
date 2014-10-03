/**
*
*	COMPUTE: mmax
*
*
*	DESCRIPTION:
*		- Finds the maximum value in a window moving across an array of numeric values.
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
    * FUNCTION: getArray(W)
    *   Returns an array pre-initialized to 0.
    * 
    * @private
    * @param {Number} x - array size
    * @returns {Array} array
    */
    function getArray(x) {
        var array = new Array(x);
        for (var i = 0; i < x; i++) {
            array[i] = 0;
        }
        return array;
    } // end FUNCTION getArray()

	/**
	* FUNCTION: mmax( arr , window )
	*	Finds the maximum value in window moving through an array of values.
	*
	* @param {Array} arr - array of data values.
	* @param {Number} window - size of moving window.
	* @returns {Array} array of maximim values.
	*/
	function mmax( arr , window ) {
		if ( !Array.isArray( arr ) ) {
			throw new TypeError( 'mmax::invalid input argument. Must provide an array.' );
		}
		if ( typeof window !== 'number' || window !== window) {
            throw new TypeError( 'mmax()::invalid input argument. Window must be numeric.' );
        }
        if ( Math.floor( window ) !== window ) {
            throw new TypeError( 'mmax()::invalid input argument. Window must be an integer value.' );
        }
		if ( window > arr.length ) {
			throw new TypeError( 'mmax()::invalid input argument. Window must be <= array size.' );
		}
		if ( window <= 0 ) {
			throw new TypeError( 'mmax()::invalid input argument. Window size must be > 0.' );
		}

		var lenIn = arr.length,
			W = window,
			lenOut = arr.length - W + 1,
			outArr = getArray(lenOut),
			winMax = Number.NEGATIVE_INFINITY;

		for ( var i = 0; i < W; i++ ) {
			if (arr[i] > winMax) {
				winMax = arr[i];
			}
		}

		outArr[0] = winMax;

		for ( var i = W; i < lenIn; i++ ) {
			
			// Case 1:
			if ( arr[i] > winMax ) {
				winMax = arr[i];
			}

			// Case 2:
			if ( arr[i-W] === winMax && arr[i] < winMax ) {
				winMax = arr[i-W+1];
				for (var j = i-W+2; j <= i; j++) {
					if (arr[j] > winMax) {
						winMax = arr[j];
					}
				}
			}

			outArr[i-W+1] = winMax;
			}		

		return outArr;
	} // end FUNCTION mmax()


	// EXPORTS //

	module.exports = mmax;

})();