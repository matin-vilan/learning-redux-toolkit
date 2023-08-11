import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewPost,
  editPost,
  selectPostById,
} from "../store/posts/postsSlice";
import { useNavigate, useParams } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";

function SinglePost() {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const isEditting = useMemo(() => postId, [postId]);
  const navigate = useNavigate();
  const singlePost = useSelector((state) => selectPostById(state, postId));

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = () => {
    isEditting
      ? dispatch(
          editPost({ id: postId, changes: { title: title, body: body } })
        )
      : dispatch(
          addNewPost({
            id: nanoid(),
            title: title,
            body: body,
            userId: nanoid(),
          })
        );
    navigate("/");
  };

  useEffect(() => {
    setTitle(isEditting ? singlePost.title : "");
    setBody(isEditting ? singlePost.body : "");
  }, [isEditting]);

  return (
    <>
      <div className="form-floating mb-3">
        <input
          id="title"
          placeholder="title"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="title">Title</label>
      </div>
      <div className="form-floating">
        <input
          id="body"
          placeholder="Body"
          className="form-control"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <label htmlFor="body">Body</label>
      </div>
      <button className="btn btn-success m-3" onClick={handleSubmit}>
        Submit
      </button>
    </>
  );
}

export default SinglePost;
