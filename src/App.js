import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import MainPage from "./pages/MainPage";
import SearchResultPage from "./pages/SearchResultPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage/>} />
                <Route path="/search-results" element={<SearchResultPage/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
