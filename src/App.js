import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import NoPage from "./Pages/NoPages/NoPages";
import File from "./Pages/File/File";
// import ViewProfile from "./Pages/ViewProfile/ViewProfile";
// import ProfileList from "./Pages/ProfileList/ProfileList";
// import AddProfile from "./Pages/Add_Profile/Add_Profile";
import Home from "./Pages/Home/Home";
import Hoso from "./Pages/Hoso/Hoso";
import Listuser from "./Pages/Listuser/Listuser";
import Adduser from "./Pages/Adduser/Adduser";
import Edituser from "./Pages/Edituser/Edituser";
function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="/hoso" element={<Hoso />} />
                        <Route path="/listuser" element={<Listuser />} />
                        <Route path="/adduser" element={<Adduser />} />
                        <Route path='/edituser/:id' element={<Edituser />} />
                        <Route path="*" element={<NoPage />} />
                        <Route path="/file" element={<File />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
