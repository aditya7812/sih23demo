import './App.css';

import { AuthProvider } from './contexts/AuthContext';
import { RoleProvider } from './contexts/RoleContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup'
import Author from './components/rolepages/Author';
import Commitee from './components/rolepages/Commitee';
import Reviewer from './components/rolepages/Reviewver';
import UploadBook from './components/UploadBook';



function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <RoleProvider>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path='/login' element={<Login />}></Route>
            <Route exact path='/signup' element={<Signup />}></Route>
            <Route path="/author" element={<Author />}></Route>
            <Route path="/reviewer" element={<Reviewer />}></Route>
            <Route path="/commitee" element={<Commitee />}></Route>
            <Route path="/author/uploadbook" element={<UploadBook />}></Route>
          </Routes>
          </RoleProvider>
        </AuthProvider>
      </Router>
      
    </div>
  );
}

export default App;
