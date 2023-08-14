import axios from 'axios';
import { server } from '../../server';

// load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: 'LoadUserRequest',
    });

    const { data } = await axios.get(`${server}/user/getuser`, {
      withCredentials: true,
    });

    dispatch({
      type: 'LoadUserSuccess',
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: 'LoadUserFail',
      payload: error.response?.data?.message,
    });
  }
};

export const getAllUserRecipe = () => async (dispatch) => {
  try {
    dispatch({
      type: 'getAllFavoriteRecipeRequest',
    });

    const { data } = await axios.get(`${server}/user/favorites-recipe`, {
      withCredentials: true,
    });

    dispatch({
      type: 'getAllFavoriteRecipeSuccess',
      payload: data.recipe,
    });
  } catch (error) {
    dispatch({
      type: 'getAllFavoriteRecipeFailed',
      payload: error.response.data.message,
    });
  }
};

export const deleteUserRecipe = (id) => async (dispatch) => {
  try {
    dispatch({
      type: 'deleteFavoriteRecipeRequest',
    });

    const { data } = await axios.delete(`${server}/user/delete-favorite-recipe/${id}`, { withCredentials: true });

    dispatch({
      type: 'deleteFavoriteRecipeSuccess',
      payload: {
        successMessage: 'User address deleted successfully!',
        user: data.user,
      },
    });
  } catch (error) {
    dispatch({
      type: 'deleteFavoriteRecipeFailed',
      payload: error.response.data.message,
    });
  }
};
