/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import CartLineItemRow from './cart-line-item-row';

const CartLineItemsTable = ( { lineItems = [] } ) => {
	const products = lineItems.map( ( lineItemRaw ) => {
		// convert low stock prop into camelCase
		const {
			low_stock_remaining: lowStockRemaining,
			...lineItem
		} = lineItemRaw;
		return (
			<CartLineItemRow
				key={ lineItem.key }
				lineItem={ { lowStockRemaining, ...lineItem } }
			/>
		);
	} );

	return (
		<table className="wc-block-cart-items">
			<thead>
				<tr className="wc-block-cart-items__header">
					<th className="wc-block-cart-items__header-product">
						{ __( 'Product', 'woo-gutenberg-products-block' ) }
					</th>
					<th className="wc-block-cart-items__header-quantity">
						{ __( 'Quantity', 'woo-gutenberg-products-block' ) }
					</th>
					<th className="wc-block-cart-items__header-total">
						{ __( 'Total', 'woo-gutenberg-products-block' ) }
					</th>
				</tr>
			</thead>
			<tbody>{ products }</tbody>
		</table>
	);
};

CartLineItemsTable.propTypes = {
	lineItems: PropTypes.arrayOf(
		PropTypes.shape( {
			key: PropTypes.string.isRequired,
		} )
	),
};

export default CartLineItemsTable;
