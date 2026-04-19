import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ArticleDetail from "../pages/ArticleDetail";
import CreateArticle from "../pages/CreateArticle";
import EditArticle from "../pages/EditArticle";
import ProtectedRoute from "./ProtectedRoute";

const AppRouter = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/articles/:slug" element={<ArticleDetail />} />

            <Route
                path="/create"
                element={
                    <ProtectedRoute>
                        <CreateArticle />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/edit/:id"
                element={
                    <ProtectedRoute>
                        <EditArticle />
                    </ProtectedRoute>
                }
                />
        </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;