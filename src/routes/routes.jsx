import React from "react";
import { Route, Routes } from "react-router-dom";
import Posts from "../store/posts/Posts";
import SinglePost from "../components/SinglePost";

const MainRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/posts/:postId" element={<SinglePost />} />
        <Route path="/create-post" element={<SinglePost />} />
      </Routes>
    </div>
  );
};

export default MainRoutes;
