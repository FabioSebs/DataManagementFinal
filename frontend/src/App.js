import Home from './components/Home'
import Purchases from './components/Purchases';
import Reviews from './components/Reviews'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/purchases" element={<Purchases />} />
      </Routes>
      {/* <Route path="/create" /> */}
    </Router>
  );
}

export default App;
