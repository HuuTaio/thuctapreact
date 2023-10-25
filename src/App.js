
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import NoPage from "./Pages/NoPages/NoPages";
function App() {
  return (
   <>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Layout />}>
    <Route path="*" element={<NoPage />} />
    </Route>
    </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;
