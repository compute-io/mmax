
// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	mmax = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-mmax', function tests() {
	'use strict';

	it( 'should export a function', function test() {
		expect( mmax ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided a non-array', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				mmax( value , 3 );
			};
		}

	});

	it( 'should throw an error if not provided a positive, numeric, integer window size', function test() {
		var values = [
			'5',
			2.7,
			-3,
			true,
			undefined,
			null,
			NaN,
			function(){},
			{},
			[]
		];

		var testdata = [3,5,6,8,7,5,4,3,2,5,6,7,8,5,4]

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				mmax( testdata , value );
			};
		}

	});

	it( 'should find the maximum value in the window', function test() {
		var data, expected;

		// Simulate some data, test all combinations of values leaving/arriving in window
		data = [41,18,10,7,25,33,9,33,8,12,33,21,44,51];

		// Expected values of max in the moving window
		expected = [41,33,33,33,33,33,33,33,44,51];

		var testOut = mmax ( data , 5 );

		for ( var i = 0; i < expected.length; i++ ) {
			assert.strictEqual( testOut[i], expected[i] );
		}
	});

});