import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import Chat from "./components/chat/Chat";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from './components/login/Login';
import { useStateValue } from "./StateProvider";


function App() {
  const [{user}, dispatch] = useStateValue()

  return (
    <div className="app">
      {!user ? (<Login />) : (
        <div className="app__body">
        <Router>
          <Routes>
            <Route path='/' element={<><Sidebar /><Chat /></>} />
            <Route path='/rooms/:roomId' element={<Chat />} />
          </Routes>
        </Router>
      </div>
    
      )}
    </div>  
  );
}

export default App;
