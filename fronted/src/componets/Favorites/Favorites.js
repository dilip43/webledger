import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import RecipeCard from '../RecipeCard/RecipeCard';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios
          .get('http://localhost:8000/api/v2/user/favorites-recipe', { withCredentials: true })
          .then((res) => {
            setData(res.data.recipe);
          })
          .catch((err) => console.log(err));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {};

  useEffect(() => {
    if (data) {
      if (searchQuery === '') {
        setFilteredData(data);
      } else {
        const filteredRecipes = data.filter((recipe) => recipe.title.toLowerCase().includes(searchQuery.toLowerCase()));
        setFilteredData(filteredRecipes);
      }
    }
  }, [data, searchQuery]);

  return (
    <>
      <div className='w-11/12 mx-auto'>
        <div className='h-[50px] my-[20px] flex items-center justify-between'>
          <div>
            <Link to='/'>
              <img
                src='data:image/png;base64,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'
                alt=''
              />
            </Link>
          </div>
          <div className='w-[100%] md:w-[50%] relative'>
            <input
              type='text'
              placeholder='Search Recipe...'
              className='h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <AiOutlineSearch size={30} className='absolute right-2 top-1.5 cursor-pointer' />
          </div>
          <div className='w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer ml-2 py-2 px-2'>
            <Link to='/favorites' className='text-[#fff] flex items-center justify-center'>
              Favorite Recipe
            </Link>
          </div>
          <div className='w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer ml-2 py-2 px-2'>
            <button onClick={handleLogout} className='text-[#fff] flex items-center justify-center'>
              Logout
            </button>
          </div>
        </div>
        <div className='mt-5 grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0'>
          {filteredData?.length > 0 ? (
            filteredData.map((i, index) => <RecipeCard data={i} key={index} />)
          ) : (
            <p>No recipes found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Favorites;
