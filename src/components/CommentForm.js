import React, { useState } from "react";
import "../App.css";


function CommentForm({ text,submitComment, id }) {
    const [handleText,setHandleText]=useState('')
    const handleSubmit=(e)=>{
      e.preventDefault()
        submitComment(handleText,id)
        

        setHandleText('')
    }

  return (
    <form className="comment-form">
      <h3>{text}</h3>
      <textarea placeholder="نظر خودت رو بنویس ..." onChange={(e)=>setHandleText(e.target.value)} value={handleText}/>
      <button onClick={handleSubmit}>ثبت</button>
    </form>
  );
}

export default CommentForm;
