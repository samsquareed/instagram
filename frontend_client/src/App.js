import Navbar from './components/Navbar';
import "./App.css"

import {BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom'
import Home from "./components/screens/Home"
import Login from "./components/screens/Login"
import Signup from "./components/screens/Signup"
import Profile from "./components/screens/Profile"
import CreatePost from "./components/screens/CreatePost"
import { createContext, useReducer } from 'react';

import {initialstate, reducer} from './reducers/userReducer'

const UserContext = createContext();

const Routing = ()=>{


    const nevigate = useNavigate();

    return(
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/createpost" element={<CreatePost />} />
        </Routes>
    )
}

function App() {    

    const [state, dispatch] = useReducer(reducer, initialstate)

    return(
        <UserContext.Provider value={{state, dispatch}}>
            <BrowserRouter>
                <Navbar />
                <Routing />
            </BrowserRouter>
        </UserContext.Provider>
    )
}

export default App;
