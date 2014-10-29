
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

	it( 'should throw an error if provided a window size which is not a positive integer', function test() {
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

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				mmax( [], value );
			};
		}
	});

	it( 'should throw an error if the window size is larger than the array size', function test() {
		var data = [ 1, 2, 3 ];

		expect( foo ).to.throw( TypeError );

		function foo() {
			mmax( data, data.length+1 );
		}
	});

	it( 'should find the maximum value in each window', function test() {
		var data, actual, expected, W;

		// Set the window size:
		W = 5;

		// Simulate some data...
		data = [ 18, 41, 10, 7, 25, 33, 9, 33, 8, 12, 33, 21, 44, 51 ];

		// Expected values:
		expected = [ 41, 41, 33, 33, 33, 33, 33, 33, 44, 51 ];

		// Actual maximum values:
		actual = mmax( data, 5 );

		assert.strictEqual( actual.length, data.length-W+1 );
		assert.deepEqual( actual, expected );
	});

});