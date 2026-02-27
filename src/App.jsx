import { Body } from '../Body';
import { Login } from './components/Login';
import Profile from './components/Profile';
import { Feed } from '../Feed';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import {Provider} from "react-redux";
import appStore from './utils/appStore';
import { Connections } from '../Connections';
import Requests from '../Requests';

function App() {
  

  return (
    <>
    <Provider store={appStore}>
    <BrowserRouter basename='/'>
        <Routes>
          <Route path='/' element={<Body/>}>
              <Route path='/' element={<Feed/>}></Route>
              <Route path='/login' element={<Login/>}></Route>
              <Route path='/profile' element={<Profile/>}></Route>
              <Route path="/connections" element={<Connections/>}></Route>
              <Route path="/requests" element={<Requests/>}></Route>
          </Route>
        </Routes>
    </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
