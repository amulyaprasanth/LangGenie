import {Navbar} from './components/Navbar.tsx';
import {Home} from './pages/Home.tsx';
import Footer from "./components/Footer.tsx";

function App() {
    return (
        <div>
            <Navbar/>
            <Home/>
            <Footer/>
        </div>
    );
}

export default App;
