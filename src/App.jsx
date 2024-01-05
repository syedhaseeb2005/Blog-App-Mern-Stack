import { BrowserRouter , Route, Routes } from "react-router-dom";
import "./App.css";
import Topbar from "./Component/Topbar/Topbar";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import Setting from "./Pages/Setting/Setting";
import Write from "./Pages/Write/Write";
import Home from "./Pages/Home/Home";
import Single from "./Pages/Single/Single";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state?.user?.user?.Db);
  return (
    <>
      <BrowserRouter>
        <Topbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={user ? <Home /> : <Register />} />
          <Route path="/login" element={user ? <Home /> : <Login />} />
          <Route path="/write" element={user ? <Write /> : <Register />} />
          <Route path="/setting" element={user ? <Setting /> : <Login/>} />
          <Route path="/post/:postId" element={<Single />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
