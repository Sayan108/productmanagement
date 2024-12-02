import {type PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  ICart,
  ICartItem,
  ICartState,
  cartInitialState,
} from '../redux.constants';

// Redux Toolkit slice
export const cartSlice = createSlice({
  name: 'cart',
  initialState: cartInitialState,

  reducers: {
    updateCurrentCategory: (
      state: ICartState,
      action: PayloadAction<string>,
    ) => {
      return {
        ...state,
        currentCategory: action.payload,
      };
    },

    updateCurrentCart: (
      state: ICartState,
      action: PayloadAction<ICartItem>,
    ) => {
      // console.log(typeof action.payload, 'in slice');
      const totalAmount = (
        parseFloat(state.currentCart.totalAmount) +
        parseFloat(action.payload.totalPrice)
      ).toFixed(2);
      return {
        ...state,

        currentCart: {
          ...state.currentCart,
          items: [action.payload, ...state?.currentCart?.items],
          totalAmount: totalAmount.toString(),
        },
      };
    },

    addNewCartInList: (state: ICartState, action: PayloadAction<ICart>) => {
      return {
        ...state,
        cartList: [action.payload, ...state.cartList],
      };
    },

    updateCartInList: (state: ICartState, action: PayloadAction<ICartItem>) => {
      return {
        ...state,
        cartList: state.cartList.map((cart, index) =>
          cart.id === action.payload.id
            ? {...cart, items: [action.payload, ...state.cartList[index].items]}
            : cart,
        ),
      };
    },

    setCurrentCart: (state: ICartState, action: PayloadAction<ICart>) => {
      const initialCart = {
        id: '',
        totalAmount: '0',
        items: [],
      };
      const newItems = state.cartList.find(
        cart => cart.id === action.payload.id,
      );
      return {
        ...state,
        currentCart: newItems ?? initialCart,
      };
    },

    clearCurrentCart: (state: ICartState, action: PayloadAction<ICart>) => {
      const initialCart = {
        id: '',
        totalAmount: '0',
        items: [],
      };

      return {
        ...state,
        currentCart: initialCart,
      };
    },

    setInitialCurrentCart: (
      state: ICartState,
      action: PayloadAction<ICart>,
    ) => {
      return {
        ...state,
        currentCart: action.payload,
      };
    },

    removeCartItem: (state: ICartState, action: PayloadAction<ICart>) => {
      const newItems = state.cartList.filter(
        cart => cart.id !== action.payload.id,
      );
      return {
        ...state,
        cartList: newItems,
      };
    },

    clearCart: (state: ICartState) => {
      return {
        ...cartInitialState,
      };
    },
  },
});
export const {
  updateCurrentCart,
  updateCurrentCategory,
  addNewCartInList,
  updateCartInList,
  removeCartItem,
  setCurrentCart,
  clearCart,
  clearCurrentCart,
  setInitialCurrentCart,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
