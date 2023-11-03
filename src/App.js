
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import NoPage from "./Pages/NoPages/NoPages";
import File from "./Pages/File/File";
import ViewProfile from "./Pages/ViewProfile/ViewProfile";
import ProfileList from "./Pages/ProfileList/ProfileList";
import AddProfile from "./Pages/Add_Profile/Add_Profile";
import Home from "./Pages/Home/Home";
function App() {
  return (
   <>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Layout />}>
    <Route index element={<Home />}/>
    <Route path="*" element={<NoPage />} />
    <Route path="/file" element={<File />}/>
    <Route path="/view-profile" element={<ViewProfile />}/>
    <Route path="/profile-list" element={<ProfileList />}/>
    <Route path="/add-profile" element={<AddProfile />}/>
    </Route>
    </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;
