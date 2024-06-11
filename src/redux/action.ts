import { UPDATE_CART_ITEM } from "./type"

export const updateCartItem = items => ({
    type: UPDATE_CART_ITEM,
    items
})