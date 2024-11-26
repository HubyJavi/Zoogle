import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import ResultsPage from "./components/ResultsPage";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <div className="flex flex-col ">
        <Header />
        <main className="flex-grow items-stretch">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/results" element={<ResultsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
