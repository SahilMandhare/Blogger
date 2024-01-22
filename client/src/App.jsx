import { useState } from "react";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import CreateBlog from "./pages/CreateBlog";
import Blog from "./pages/Blog";
import UpdateBlog from "./pages/UpdateBlog";
import Search from "./pages/Search";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/search" element={<Search />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/create-blog" element={<CreateBlog />} />  
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/update-blog/:id" element={<UpdateBlog />} />  
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/blog/:id" element={<Blog />} />  
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;