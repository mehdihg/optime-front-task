import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { FaRegUserCircle } from "react-icons/fa";
import "../App.css";
import { ulid } from "ulid";
import CommentForm from "../components/CommentForm";
import {
  editComment,
  removeComment,
  addComment,
} from "../provider/commentSlice";
import Button from "../components/Button";
function SingleComment({ item }) {
  const dispatch = useDispatch();

  const [activeRes, setActiveRes] = useState(false);
  const [activeEdit, setActiveEdit] = useState(false);
  const handleRemove = (id) => {
    dispatch(removeComment(id));
  };
  const handleEdit = (body, id) => {
    dispatch(editComment({ id, body }));
    setActiveEdit(false);
  };
  const handleReply = (body, id) => {
    const cm = {
      id: ulid(),
      body: body,
      username: "محسن",
      userId: "5",
      parentId: id,
      createdAt: Date.now(),
    };
    dispatch(addComment(cm));
    setActiveRes(false);
  };
  return (
    <div>
      <div className="comment-body">
        <div className="comment-user">
          <div className="comment-user-avatar">
            <span>{item.username[0]}</span>
          </div>
          <div className="comment-username">
            <span>{item.username}</span>
            <span>{new Date(item.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        <p className="comment-item-body">{item.body}</p>
        <div className="comment-body-buttons">
          {activeRes ? (
            <Button text="بستن" isOpen={activeRes} setIsOpen={setActiveRes} />
          ) : (
            item.parentId === null && (
              <Button
                text="پاسخ"
                isOpen={activeRes}
                setIsOpen={setActiveRes}
              />
            )
          )}

          <button onClick={() => handleRemove(item.id)}>حذف</button>
          {activeEdit & item.id ? (
            <Button text="بستن" isOpen={activeEdit} setIsOpen={setActiveEdit} />
          ) : (
            <Button
              text="ویرایش"
              isOpen={activeEdit}
              setIsOpen={setActiveEdit}
            />
          )}
        </div>
        {activeRes && <CommentForm submitComment={handleReply} id={item.id} />}
        {activeEdit && <CommentForm submitComment={handleEdit} id={item.id} />}
      </div>
    </div>
  );
}

export default SingleComment;
