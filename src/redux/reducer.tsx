import { CLEAR_CART, UPDATE_CART_ITEM } from "./type";

export const cartReducer = (state = { items: [] ,quantity:0,total:0}, action) => {
    switch (action.type) {
        case CLEAR_CART:
            return { items: [] };
        case UPDATE_CART_ITEM:
            try{
            const items = action.items;
            const quantitys = action.items.quantity;
            if (items && quantitys > 0) {
                return { ...state, items:items.items,quantity:quantitys,total:action.items.total };
            } else {
                return { ...state,items: items.items,quantity:quantitys,total:action.items.total };
            }
        }catch(err){
            return { ...state };
        }

        default:
            return state;
    }
};