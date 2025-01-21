import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Navbar} from './components/Navbar.tsx';
import {Home} from './pages/Home.tsx';
import {ToolAgent} from './pages/ToolAgent';
import {RagChain} from './pages/RagChain';

function App() {
    return (
        <div>
            <Navbar/>
            <Router>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/tool" element={<ToolAgent/>}/>
                    <Route path="/rag" element={<RagChain/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;