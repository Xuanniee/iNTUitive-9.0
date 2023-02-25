import './App.css';
import FileUpload from './react-components/uploadPDF';
import './App.css'
import {Route, Routes} from "react-router-dom";
//import { UserContextProvider } from './UserContext';
import Layout from './Layout';
//import Navbar from './components/Navbar';
import HomePage from "./Pages/HomePage"
import LoginPage from "./Pages/LoginPage"

export default function App() {
  return (
    <div>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<HomePage/>} />
            <Route path="/login" element={<LoginPage/>}/>
          </Route>
        </Routes>
        <FileUpload />
    </div>
  );

}








