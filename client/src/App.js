import './App.css';
import {Route, Routes} from "react-router-dom";
import { UserContextProvider } from './UserContext';
import Layout from './Layout';
//import Navbar from './components/Navbar';
import HomePage from "./Pages/HomePage"
import LoginPage from "./Pages/LoginPage"
import RegisterPage from './Pages/RegisterPage';
import axios from 'axios';
import ProfilePage from './Pages/ProfilePage';


axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

export default function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<HomePage/>} />
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/account" element={<ProfilePage/>}/>
        </Route>
      </Routes>
    </UserContextProvider>
  ) 
}








