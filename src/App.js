
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import NoPage from "./Pages/NoPages/NoPages";
import File from "./Pages/File/File";
import Home from "./Pages/Home/Home";
import Login from './Pages/Login/login';
function App() {
  return (
   <>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Layout />}>
    <Route index element={<Home />}/>
    <Route path="*" element={<NoPage />} />
    <Route path="/file" element={<File />}/>
    
    </Route>

    <Route path="/login" element={<Login />} />
      

    </Routes>

    </BrowserRouter>
   </>
  );
}

export default App;
