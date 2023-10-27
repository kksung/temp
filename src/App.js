import React, {useState, useEffect} from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import HomeView from "./HomeView";
// import Home from "./Home";

// import { Component, useState } from "react";
function App() {
  return (
    <>
      {/* <Route path='/Login' element={<Login/>} /> */}
      <Login />
      <HomeView />
      {/* <Home /> */}
    </>
  );
}

export default App;