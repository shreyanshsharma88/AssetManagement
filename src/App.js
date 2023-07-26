import './App.css';
import { LoginPage } from './Components/login';
import { Routes, Route, useNavigate, BrowserRouter } from 'react-router-dom';
import { Dashboard } from './Components/Dashboard';
import { AccessToken } from './Components/globalToken'
function App() {
  return (
    <div className="App">

      <AccessToken>
        <Routes>
          <Route path='/dashboard' element={<Dashboard />}></Route>
          <Route path='/' element={<LoginPage />}></Route>

        </Routes>
      </AccessToken>

    </div>
  );
}

export default App;
