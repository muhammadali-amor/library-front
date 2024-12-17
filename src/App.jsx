import {BrowserRouter, Route, Routes} from "react-router-dom";
import UserLayout from "./layout/UserLayout.jsx";
import AdminLayout from "./layout/AdminLayout.jsx";
import UserMenu from "./component/user/Menu.jsx";
import AdminMenu from "./component/admin/Menu.jsx";
import PdfPage from "./pages/PdfPage.jsx";

function App() {

  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<UserLayout/>}>
                    <Route index element={<UserMenu/>}/>
                </Route>
                <Route path={"/library!admin-dashboard"} element={<AdminLayout/>}>
                    <Route index element={<AdminMenu/>}/>
                </Route>
                <Route path={'/:id'} element={<PdfPage/>}/>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
