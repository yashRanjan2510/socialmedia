import './App.css';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Header from './component/header/Header';
import Login from './component/login/Login';

import { useEffect } from 'react';
import { useDispatch ,useSelector} from 'react-redux';
import { loadUser } from './actions/User';
import Home from './component/Home/Home';
import Account from './component/account/Account';
import { Newpost } from './component/newpost/Newpost';
import Register from './component/register/Register';
import Updateprofile from './component/updateprofile/Updateprofile';
import Updatepassword from './component/updatepassword/Updatepassword';
import Forgotpassword from './component/forgotpassword/Forgotpassword';
import Resetpassword from './component/resetpassword/Resetpassword';
import Userprofile from './component/userprofile/Userprofile';
import Search from './component/search/Search';
import Notfound from './component/notfound/Notfound';

function App() {
  const dispatch=useDispatch();
  useEffect(()=>{
     dispatch(loadUser())
  },[dispatch])

  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <Router>
      {isAuthenticated && <Header />}
      <Routes>
      
      <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />
      <Route path="/account" element={isAuthenticated ? <Account /> : <Login />} />
      <Route path="/register" element={isAuthenticated ? <Account /> : <Register />} />
      <Route path='/update/password' element={isAuthenticated ? <Updatepassword /> : <Login />}></Route>
      <Route path="/update/profile" element={isAuthenticated ? <Updateprofile /> : <Register />} />
      <Route path="/newpost" element={isAuthenticated ? <Newpost /> : <Login />}/>
      <Route path="/forgot/password" element={isAuthenticated ? <Updatepassword /> : <Forgotpassword />}/>
      <Route path="/password/reset/:token" element={isAuthenticated ? <Updatepassword /> : <Resetpassword />} />
      <Route path="search" element={isAuthenticated ? <Search /> : <Login />} />
      <Route path="/user/:id" element={isAuthenticated ? <Userprofile /> : <Login />} />
      <Route path="*" element={<Notfound />} />
      </Routes>
    </Router>
  );
}

export default App;
