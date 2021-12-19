import Home from './components/Home'
import Purchases from './components/Purchases';
import Reviews from './components/Reviews'
import Search from './components/Search'
import Create from './components/Create';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/purchases" element={<Purchases />} />
        <Route path="/search" element={<Search />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </Router>
  );
}

export default App;
