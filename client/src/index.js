import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/index";
import Home from './components/home/Home'; 
import Details from './components/details/Details';
import GameCreator from './components/gameCreator/GameCreator';


ReactDOM.render(
  <Provider store = { store }>
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<App/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/videogame/:id" element={<Details/>}/>
      <Route path="/videogames" element={<GameCreator/>}/>
    </Routes>
  </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
