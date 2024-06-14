import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route ,Routes} from 'react-router-dom';
import Login from './Components/Landing/Login/Login';
import Register from './Components/Landing/Register/Register';
import AllMembers from './Components/Admin/AllMembers/AllMembers';
import Profile from './Components/User/Profile/Profile';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="register" element={<Register/>}/>
            <Route path="allMembers" element={<AllMembers/>}/>
            <Route path="profile" element={<Profile/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
