import CartActionTypes from './cart.types';

export const toggleCartHidden = () => ({
	type: CartActionTypes.TOGGLE_CART_HIDDEN
});

export const populateCart = items => ({
	type: CartActionTypes.POPULATE_CART,
	payload: items
});

export const addItem = item => ({
	type: CartActionTypes.ADD_ITEM,
	payload: item
});

export const removeItem = item => ({
	type: CartActionTypes.REMOVE_ITEM,
	payload: item
});

export const clearItemFromCart = item => ({
	type: CartActionTypes.CLEAR_ITEM_FROM_CART,
	payload: item
});

export const clearCart = () => ({
	type: CartActionTypes.CLEAR_CART
});



