import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import NoPage from "./Pages/NoPages/NoPages";
import File from "./Pages/File/File";
// import ViewProfile from "./Pages/ViewProfile/ViewProfile";
// import ProfileList from "./Pages/ProfileList/ProfileList";
// import AddProfile from "./Pages/Add_Profile/Add_Profile";
import Home from "./Pages/Home/Home";
import Hoso from "./Pages/Hoso/Hoso";
import Listuser from "./Pages/Listuser/Listuser";
import AddProfile from "./Pages/Add_Profile/Add_Profile";
import ViewProfile from "./Pages/ViewProfile/ViewProfile";
import EditProfile from "./Pages/EditProfile/EditProfile";
function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="/hoso" element={<Hoso />} />
                        <Route path="/danhsachuser" element={<Listuser />} />
                        <Route path="/add-profile" element={<AddProfile />} />
                        <Route path="*" element={<NoPage />} />
                        <Route path="/file" element={<File />} />
                        <Route path="/view-profile" element={<ViewProfile />} />
                        <Route path="/edit-profile/:id" element={<EditProfile/>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
