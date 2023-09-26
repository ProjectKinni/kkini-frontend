import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import MainPage from "./pages/MainPage";
import SearchResultPage from "./pages/SearchResultPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import MyPage from "./pages/MyPage";
import LoginPage from "./pages/LoginPage";
import {UserProvider} from "./components/UserContext";
import InformationPage from "./pages/InformationPage";
import HelpPage from "./pages/HelpPage";
import GreenRankingPage from "./pages/GreenRankingPage"
import KkiniRankingPage from "./pages/KkiniRankingPage"
import KkiniPickPage from "./pages/KkiniPickPage"
import CommunityPage from "./pages/CommunityPage"
import NavigationBarContainer from "./containers/NavigationBarContainer"

import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";


function App() {
    return (
        <BrowserRouter>
            <UserProvider>
                <NavigationBarContainer />
                <Routes>
                    <Route path="/" element={<MainPage/>} />
                    <Route path="/search-results" element={<SearchResultPage/>} />
                    <Route path="/products/:productId" element={<ProductDetailPage/>} />
                    <Route path="/user" element={<MyPage />}/>
                    <Route path="/login" element={<LoginPage />}/>
                    <Route path="/information" element={<InformationPage />}/>
                    <Route path="/help" element={<HelpPage />}/>
                    <Route path="/privacy" element={<PrivacyPolicyPage/>}/>
                    <Route path="/terms" element={<TermsOfServicePage/>}/>

                    <Route path="/green-ranking" element={<GreenRankingPage/>}/>
                    <Route path="/ranking" element={<KkiniRankingPage/>}/>
                    <Route path="/pick" element={<KkiniPickPage/>}/>
                    <Route path="/community" element={<CommunityPage/>}/>
                </Routes>
            </UserProvider>
        </BrowserRouter>
    );
}

export default App;
