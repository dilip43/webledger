import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { server } from '../../server';
import { deleteUserRecipe } from '../../redux/actions/user';
import { useDispatch } from 'react-redux';

const RecipeCard = ({ data, favorite }) => {
  const dispatch = useDispatch();

  const addToFavourite = async () => {
    try {
      await axios.post(`${server}/user/save-favorite-recipe`, { data }, { withCredentials: true }).then((res) => {
        toast.success(res.data.message);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromFavorite = async () => {
    dispatch(deleteUserRecipe(data.id));
  };

  return (
    <>
      <div className='w-full h-[275px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer'>
        <Link to={`/recipe/${data?.id}`}>
          <img src={`${data?.image && data?.image}`} alt='' className='w-full h-[170px] object-contain' />
        </Link>
        <h5 className='mt-2'> {data?.title?.length > 40 ? data?.title?.slice(0, 40) + '...' : data?.title}</h5>
        <div className='flex justify-between mt-3'>
          <button
            className='select-none text-center rounded whitespace-nowrap py-1 px-2 text-blue-600 bg-white hover:bg-blue-600 hover:text-white'
            onClick={favorite ? addToFavourite : removeFromFavorite}
          >
            {favorite ? 'Add to Favorite' : 'Remove'}
          </button>

          <Link
            to={`/recipe/${data?.id}`}
            className='text-center rounded py-1 px-2 text-blue-600 bg-white hover:bg-blue-600 hover:text-white'
          >
            View Recipe
          </Link>
        </div>
      </div>
    </>
  );
};

export default RecipeCard;
