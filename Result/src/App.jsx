import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './LoginPage';
import DataPage from './DataPage';
import CombinedComponent from './CombinedComponent';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CombinedComponent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
