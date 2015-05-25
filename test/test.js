'use strict';

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

	it( 'should throw an error if `options` is not an object', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				mmax( [1,2,3,4,5], 2, value );
			};
		}
	});

	it( 'should throw an error if provided an accessor which is not a function', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				mmax( [1,2,3,4,5], 2, {'accessor': value} );
			};
		}
	});

	it( 'should throw an error if provided a copy option which is not a boolean', function test() {
		var values = [
			'5',
			5,
			function(){},
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				mmax( [1,2,3,4,5], 2, {'copy': value} );
			};
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


	it( 'should find the maximum value in each window using an accessor function', function test() {
		// Case 2: accessor, copy
		var data, actual, expected, W;

		W = 5;
		data = [
			{'x':18},
			{'x':41},
			{'x':10},
			{'x':7},
			{'x':25},
			{'x':33},
			{'x':9},
			{'x':33},
			{'x':8},
			{'x':12},
			{'x':33},
			{'x':21},
			{'x':44},
			{'x':51}
		];

		function getValue( d ) {
			return d.x;
		}

		expected = [ 41, 41, 33, 33, 33, 33, 33, 33, 44, 51 ];

		actual = mmax( data, W, {'accessor': getValue} );

		assert.strictEqual( actual.length, data.length-W+1 );
		assert.deepEqual( actual, expected );
		assert.ok( actual !== data );
	});


	it( 'should find maximum value in each windown and mutate the input array', function test() {

		var data, expected, actual;

		data = [ 1, 1, 1 ];
		expected = [ 1 ];

		actual = mmax( data, 3, {'copy':false} );
		assert.deepEqual( actual, expected );
		assert.ok( actual === data );
	});

	it( 'should find the minimum value in each window using an accessor and mutate the input array', function test() {
		var data, expected, actual;

		data = [
			[0,1],
			[1,1],
			[2,1]
		];
		expected = [ 1 ];

		function getValue( d ) {
			return d[ 1 ];
		}

		actual = mmax( data, 3, {
			'copy': false,
			'accessor': getValue
		});

		assert.deepEqual( actual, expected );
		assert.ok( actual === data );
	});

});
