import {BrowserRouter, Routes, Route} from 'react-router-dom'

import './App.css';
import Home from './screens/Home';
import TopBar from './components/TopBar';
import Profile from './screens/Profile';
import Footer from './components/Footer';
import Class from './screens/Class';
import Assignment from './screens/Assignment';
import Grade from './screens/Grade';
import Login from './screens/Login';
import Signup from './screens/Signup';
import ResetScreen from './screens/ResetScreen';

function App() {
  
  return (
   <>
   <TopBar/>
    <BrowserRouter>   
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/class' element={<Class/>}/>
          <Route path='/assignment' element={<Assignment/>}/>
          <Route path='/grade' element={<Grade/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path="/resetpassword" element={<ResetScreen/>}/>
        </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;
