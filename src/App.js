import './App.css';
import { LoginPage } from './Components/login';
import { Routes, Route, useNavigate, BrowserRouter } from 'react-router-dom';
import { Dashboard } from './Components/Dashboard';
import { AccessToken } from './Components/globalToken'
import { AddAssetOption, AssetList } from './Components/assetList';
import { useState } from 'react';
function App() {
  const [showAddAsset, setShowAddAsset] = useState(false)

  console.log(showAddAsset)
  return (
    <div className="App">

      <AccessToken>
        <Routes>
          <Route path='/' element={<LoginPage />}></Route>
          <Route path='/dashboard' element={<Dashboard />}></Route>
          <Route path='/dashboard/assetList' element={<AssetList setShowAddAsset={setShowAddAsset} />}></Route>
        </Routes>
      </AccessToken>
      <div style={{display:'flex',alignItems:'center' , justifyContent:'center'}}>

      {showAddAsset && <AddAssetOption setShowAddAsset={setShowAddAsset} />}
      </div>
    </div>
  );
}

export default App;
