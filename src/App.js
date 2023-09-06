import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import MainPage from "./pages/MainPage";
import SearchResultPage from "./pages/SearchResultPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import UserInfoPage from "./pages/UserInfoPage";
import LoginPage from "./pages/LoginPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage/>} />
                <Route path="/search-results" element={<SearchResultPage/>} />
                <Route path="/products/:productId" element={<ProductDetailPage/>} />
                <Route path="/user" element={<UserInfoPage />}/>
                <Route path="/login" element={<LoginPage />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
