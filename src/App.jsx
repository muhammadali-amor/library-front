import {BrowserRouter, Route, Routes} from "react-router-dom";
import UserLayout from "./layout/UserLayout.jsx";
import AdminLayout from "./layout/AdminLayout.jsx";
import Menu from "./component/admin/Menu.jsx";
import PdfPage from "./pages/PdfPage.jsx";

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
                <Route path={'/:id'} element={<PdfPage/>}/>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
