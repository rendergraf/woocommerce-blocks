/**
 * External dependencies
 */
import {
	switchUserToAdmin,
	openDocumentSettingsSidebar,
} from '@wordpress/e2e-test-utils';
import {
	visitBlockPage,
	switchBlockInspectorTabWhenGutenbergIsInstalled,
} from '@woocommerce/blocks-test-utils';

const block = {
	name: 'Customer account',
	slug: 'woocommerce/customer-account',
	class: '.wc-block-customer-account',
};

const SELECTORS = {
	icon: '.wp-block-woocommerce-customer-account svg',
	label: '.wp-block-woocommerce-customer-account .label',
	iconToggle: '.wc-block-customer-account__icon-style-toggle',
	displayDropdown: '.customer-account-display-style select',
};

describe( `${ block.name } Block`, () => {
	beforeAll( async () => {
		await switchUserToAdmin();
		await visitBlockPage( `${ block.name } Block` );
	} );

	it( 'renders without crashing', async () => {
		await expect( page ).toRenderBlock( block );
	} );

	describe( 'attributes', () => {
		beforeEach( async () => {
			await openDocumentSettingsSidebar();
			await switchBlockInspectorTabWhenGutenbergIsInstalled( 'Settings' );
			await page.click( block.class );
		} );

		it( 'icon options can be set to Text-only', async () => {
			await expect( page ).toSelect(
				SELECTORS.displayDropdown,
				'Text-only'
			);
			await expect( page ).not.toMatchElement( SELECTORS.iconToggle );

			await expect( page ).not.toMatchElement( SELECTORS.icon );
			await expect( page ).toMatchElement( SELECTORS.label );
		} );

		it( 'icon options can be set to Icon-only', async () => {
			await expect( page ).toSelect(
				SELECTORS.displayDropdown,
				'Icon-only'
			);
			await expect( page ).toMatchElement( SELECTORS.iconToggle );

			await expect( page ).toMatchElement( SELECTORS.icon );
			await expect( page ).not.toMatchElement( SELECTORS.label );
		} );

		it( 'icon options can be set to Icon and text', async () => {
			await expect( page ).toSelect(
				SELECTORS.displayDropdown,
				'Icon and text'
			);
			await expect( page ).toMatchElement( SELECTORS.iconToggle );

			await expect( page ).toMatchElement( SELECTORS.icon );
			await expect( page ).toMatchElement( SELECTORS.label );
		} );
	} );
} );
