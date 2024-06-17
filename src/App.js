import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route ,Routes} from 'react-router-dom';
import Login from './Components/Landing/Login/Login';
import Register from './Components/Landing/Register/Register';
import AllMembers from './Components/Admin/AllMembers/AllMembers';
import Profile from './Components/User/Profile/Profile';
import AddNewMember from './Components/Admin/AddNewMember/AddNewMember';
import ViewMember from './Components/Admin/ViewMember/ViewMember';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="register" element={<Register/>}/>
            <Route path="allMembers" element={<AllMembers/>}/>
            <Route path="addMembers" element={<AddNewMember/>}/>
            <Route path="viewMember" element={<ViewMember/>}/>
            <Route path="profile" element={<Profile/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
