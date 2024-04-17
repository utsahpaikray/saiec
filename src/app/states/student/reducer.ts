// import { createReducer, on } from '@ngrx/store';
// import { add, remove, clear, updateAllState } from '../student/action';
// import { AppState } from './state';
// // import { AppState } from '../app.state';

// export const initialState:AppState  = {
//   products:[],
//   students:[]
// };

// export const studentReducer = createReducer(
//   initialState,
//   on(add, (state, {product}) => (
//     {
//       ...state,
//       products: [...state.products, product]
//     }
//   )
//   ),
//   on(remove, (state, {product}) => ({
//     ...state,
//     products: state.products.filter((p: any)=> product.id != p.id)
//   })),
//   on(updateAllState, (state, {products}) => (
//     {
//       ...state,
//       products
//     }
//   )
//   ),
//   on(clear, state => initialState)
// );