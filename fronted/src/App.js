import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Dashboard from './componets/Dashboard/Dashboard';
import Favorites from './componets/Favorites/Favorites';
import Login from './componets/Login/Login';
import RecipeDetailsCard from './componets/RecipeDetailsCard/RecipeDetailsCard';
import Signup from './componets/Signup/Signup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/sign-up' element={<Signup />} />
        <Route path='/' element={<Dashboard />} />
        <Route path='/recipe/:id' element={<RecipeDetailsCard />} />
        <Route path='/favorites' element={<Favorites />} />
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
