import WelcomComponent from "./component/WelcomComponent";
import {Route, Routes} from "react-router-dom";
import React from "react";
import TestComponent from "./component/TestComponent";

function App() {
    return (
        <Routes>
            <Route index element={<WelcomComponent/>}/>
            <Route path='/test' element={<TestComponent/>}/>
        </Routes>
    );
}

export default App;
