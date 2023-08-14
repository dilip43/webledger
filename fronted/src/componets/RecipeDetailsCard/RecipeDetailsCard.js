import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const RecipeDetailsCard = () => {
  const { id } = useParams();
  const apiKey = '982dda743c764e41b51375f5c601a61f';
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios
          .get(`http://localhost:8000/api/v2/recipe/${id}`, { withCredentials: true })
          .then((res) => setData(res.data))
          .catch((err) => console.log(err));
      } catch (error) {
        console.error('Error fetching recipe details:', error);
      }
    };
    fetchData();
  }, [id]);

  const { title, image, summary, analyzedInstructions } = data || {};

  return (
    <div className='container mx-auto p-6'>
      {data && (
        <div className='bg-white rounded-lg shadow-md p-6'>
          <h1 className='text-3xl font-semibold mb-4'>{title}</h1>
          <div className='flex justify-center mb-4'>
            <img src={image} alt={title} className='rounded-lg w-64 h-auto' />
          </div>
          <div className='text-gray-700'>
            <h2 className='text-xl font-semibold mb-2'>Summary</h2>
            <p dangerouslySetInnerHTML={{ __html: summary }} />
          </div>
          <div className='mt-6'>
            <h2 className='text-xl font-semibold mb-4'>Instructions</h2>
            {analyzedInstructions.map((instruction, instructionIndex) => (
              <div key={instructionIndex} className='mb-6'>
                <h3 className='text-lg font-semibold mb-2'>Instruction {instructionIndex + 1}</h3>
                <ol className='list-decimal ml-6'>
                  {instruction.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className='mb-3'>
                      <p className='mb-2'>Step {step.step}</p>
                      <h4 className='text-lg font-semibold mb-2'>Ingredients</h4>
                      <ul className='list-disc ml-6'>
                        {step.ingredients.map((ingredient, ingredientIndex) => (
                          <li key={ingredientIndex}>{ingredient.name}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
          <Link
            to='/'
            className='w-[100px] text-white bg-gray-700 h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer'
          >
            Back
          </Link>
        </div>
      )}
    </div>
  );
};

export default RecipeDetailsCard;
