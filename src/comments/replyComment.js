import React from "react";
import SingleComment from "./singleComment";

import "../App.css";
function ReplyComment({ comments, parentId }) {
  return comments.map((comment) => {
    return (
      parentId === comment.parentId && (
        <div className="nested-comments" key={comment.id}>
          <React.Fragment >
            <SingleComment item={comment} />
            <ReplyComment parentId={comment.id} comments={comments} />
          </React.Fragment>
        </div>
      )
    );
  });
}

export default ReplyComment;
