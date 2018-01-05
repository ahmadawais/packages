/**
 * Internal dependencies
 */
import {
	Component,
	createElement,
	concatChildren,
	renderToString,
	getWrapperDisplayName,
} from '../';

describe( 'element', () => {
	describe( 'concatChildren', () => {
		it( 'should return an empty array for undefined children', () => {
			expect( concatChildren() ).toEqual( [] );
		} );

		it( 'should concat the string arrays', () => {
			expect( concatChildren( [ 'a' ], 'b' ) ).toEqual( [ 'a', 'b' ] );
		} );

		it( 'should concat the object arrays and rewrite keys', () => {
			const concat = concatChildren(
				[ createElement( 'strong', {}, 'Courgette' ) ],
				createElement( 'strong', {}, 'Concombre' )
			);
			expect( concat ).toHaveLength( 2 );
			expect( concat[ 0 ].key ).toBe( '0,0' );
			expect( concat[ 1 ].key ).toBe( '1,0' );
		} );
	} );

	describe( 'getWrapperDisplayName()', () => {
		it( 'should use default name for anonymous function', () => {
			expect( getWrapperDisplayName( () => createElement( 'div' ), 'test' ) ).toBe( 'Test(Component)' );
		} );

		it( 'should use camel case starting with upper for wrapper prefix ', () => {
			expect( getWrapperDisplayName( () => createElement( 'div' ), 'one-two_threeFOUR' ) ).toBe( 'OneTwoThreeFour(Component)' );
		} );

		it( 'should use function name', () => {
			function SomeComponent() {
				return createElement( 'div' );
			}

			expect( getWrapperDisplayName( SomeComponent, 'test' ) ).toBe( 'Test(SomeComponent)' );
		} );

		it( 'should use component class name', () => {
			class SomeComponent extends Component {
				render() {
					return createElement( 'div' );
				}
			}

			expect( getWrapperDisplayName( SomeComponent, 'test' ) ).toBe( 'Test(SomeComponent)' );
		} );

		it( 'should use displayName property', () => {
			class SomeComponent extends Component {
				render() {
					return createElement( 'div' );
				}
			}
			SomeComponent.displayName = 'CustomDisplayName';

			expect( getWrapperDisplayName( SomeComponent, 'test' ) ).toBe( 'Test(CustomDisplayName)' );
		} );
	} );
} );
