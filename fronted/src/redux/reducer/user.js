import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
};

export const userReducer = createReducer(initialState, {
  LoadUserRequest: (state) => {
    state.isloading = true;
  },

  LoadUserSuccess: (state, action) => {
    state.isAuthenticated = true;
    state.loading = false;
    state.user = action.payload;
  },

  LoadUserFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

  // get all fav. recipe of a user
  getAllFavoriteRecipeRequest: (state) => {
    state.recipeLoding = true;
  },
  getAllFavoriteRecipeSuccess: (state, action) => {
    state.recipeLoding = false;
    state.recipes = action.payload;
  },
  getAllFavoriteRecipeFailed: (state, action) => {
    state.recipeLoding = false;
    state.error = action.payload;
  },

  deleteFavoriteRecipeRequest: (state) => {
    state.deleteRecipeLoading = true;
  },
  deleteFavoriteRecipeSuccess: (state, action) => {
    state.deleteRecipeLoading = false;
    state.recipes = action.payload;
  },
  deleteFavoriteRecipeFailed: (state, action) => {
    state.deleteRecipeLoading = false;
    state.error = action.payload;
  },

  clearErrors: (state) => {
    state.error = null;
  },
});
