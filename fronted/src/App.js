import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import ProtectedRoute from './ProtectedRoutes';
import Dashboard from './componets/Dashboard/Dashboard';
import Favorites from './componets/Favorites/Favorites';
import Login from './componets/Login/Login';
import RecipeDetailsCard from './componets/RecipeDetailsCard/RecipeDetailsCard';
import Signup from './componets/Signup/Signup';
import { loadUser } from './redux/actions/user';
import Store from './redux/store';

function App() {
  useEffect(() => {
    Store.dispatch(loadUser());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/sign-up' element={<Signup />} />
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path='/recipe/:id'
          element={
            <ProtectedRoute>
              <RecipeDetailsCard />
            </ProtectedRoute>
          }
        />
        <Route
          path='/favorites'
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer
        position='bottom-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
    </BrowserRouter>
  );
}

export default App;
