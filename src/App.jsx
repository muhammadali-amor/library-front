import {BrowserRouter, Route, Routes} from "react-router-dom";
import UserLayout from "./layout/UserLayout.jsx";
import AdminLayout from "./layout/AdminLayout.jsx";
import Menu from "./component/admin/Menu.jsx";

function App() {

  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<UserLayout/>}>

                </Route>
                <Route path={"/library!admin-dashboard"} element={<AdminLayout/>}>
                    <Route index element={<Menu/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
