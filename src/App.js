import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import MainPage from "./pages/MainPage";
import SearchResultPage from "./pages/SearchResultPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import MyPage from "./pages/MyPage";
import LoginPage from "./pages/LoginPage";
import {UserProvider} from "./components/UserContext";

import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";

function App() {
    return (
        <BrowserRouter>
            <UserProvider>
                <Routes>
                    <Route path="/" element={<MainPage/>} />
                    <Route path="/search-results" element={<SearchResultPage/>} />
                    <Route path="/products/:productId" element={<ProductDetailPage/>} />
                    <Route path="/user" element={<MyPage />}/>
                    <Route path="/login" element={<LoginPage />}/>

                    <Route path="/privacy" element={<PrivacyPolicyPage/>}/>
                    <Route path="/terms" element={<TermsOfServicePage/>}/>
                </Routes>
            </UserProvider>
        </BrowserRouter>
    );
}

export default App;
