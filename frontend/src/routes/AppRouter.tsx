import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ArticleDetail from "../pages/ArticleDetail";
import CreateArticle from "../pages/CreateArticle";
import EditArticle from "../pages/EditArticle";
import CategoryPage from "../pages/CategoryPage";
import AuthorProfile from "../pages/AuthorProfile";

import ProtectedRoute from "./ProtectedRoute";

const AppRouter = () => {
    return (
        <Routes>
            {/* REDIRECT ROOT */}
            <Route path="/" element={<Navigate to="/articles" />} />

            {/* AUTH */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* ARTICLES */}
            <Route path="/articles" element={<Home />} />
            <Route path="/:username/:slug" element={<ArticleDetail />} />

            {/* CATEGORY FILTER */}
            <Route path="/category/:slug" element={<CategoryPage />} />

            {/* CREATE */}
            <Route
                path="/articles/create"
                element={
                    <ProtectedRoute>
                        <CreateArticle />
                    </ProtectedRoute>
                }
            />

            {/* EDIT */}
            <Route
                path="/articles/edit/:id"
                element={
                    <ProtectedRoute>
                        <EditArticle />
                    </ProtectedRoute>
                }
            />

            {/* AUTOR PROFILE*/}
            <Route path="/:username" element={<AuthorProfile />} />

            {/* fallback */}
            <Route path="*" element={<Navigate to="/articles" />} />
        </Routes>
    );
};

export default AppRouter;