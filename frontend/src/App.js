import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {RagChain} from "./pages/RagChain";
import {Home} from "./pages/Home/Home";
import {ToolAgent} from "./pages/ToolAgent";
import Navbar from "./components/Navbar/Navbar";

function App() {
    return (
        <div>
            <Navbar/>
            <Router>
                <Routes>
                    <Route path="/" element={<Home/>}> </Route>
                    <Route path="/tool" element={<ToolAgent/>}></Route>
                    <Route path="/rag" element={<RagChain/>}> </Route>
                </Routes>
            </Router>
        </div>

    )
}

export default App;
