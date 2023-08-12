import React, { Fragment, useEffect } from "react";
import {
  deletePost,
  fetchAllPosts,
  selectAllPosts,
  selectPostById,
} from "./postsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Posts() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => selectAllPosts(state));
  const status = useSelector((state) => state.posts.status);

  const handleDeletePost = (postId) => {
    dispatch(deletePost(postId));
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllPosts());
    }
  }, []);

  let content;
  switch (status) {
    case "loading":
      content = <div>loading...</div>;
      break;
    case "success":
      content = posts.map((post) => (
        <section key={post.id}>
          <div className={"card my-3 cursor-pointer"}>
            <Link to={`/posts/${post.id}`}>
              <div className="card-body">
                <div>{post.title}</div>
                <div>{post.body}</div>

                <br></br>
              </div>
            </Link>
            <button
              onClick={() => handleDeletePost(post.id)}
              className="btn btn-sm btn-danger"
            >
              Delete this post
            </button>
          </div>
        </section>
      ));
      break;
    default:
      break;
  }

  return <div>{content}</div>;
}

export default Posts;
