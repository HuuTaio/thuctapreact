import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import NoPage from "./Pages/NoPages/NoPages";
import File from "./Pages/File/File";
import Home from "./Pages/Home/Home";
import Hoso from "./Pages/Hoso/Hoso";
import Listuser from "./Pages/Listuser/Listuser";
function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="/hoso" element={<Hoso />} />
                        <Route path="/danhsachuser" element={<Listuser />} />
                        <Route path="*" element={<NoPage />} />
                        <Route path="/file" element={<File />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
