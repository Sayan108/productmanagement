import {combineReducers} from '@reduxjs/toolkit';

import {cartReducer} from './cart.slice';
import {orderReducer} from './order.slice';

export const rootReducer = combineReducers({
  cart: cartReducer,
  order: orderReducer,
});
