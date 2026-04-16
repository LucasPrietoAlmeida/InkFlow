import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home.tsx";
import Login from "../pages/Login.tsx";
import Register from "../pages/Register.tsx";
import ArticleDetail from "../pages/ArticleDetail.tsx";

const AppRouter = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/articles/:slug" element={<ArticleDetail />} />
        </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;