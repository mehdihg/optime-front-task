import React, { useEffect } from "react";
import { ulid } from "ulid";
import CommentForm from "../components/CommentForm";
import SingleComment from "./singleComment";
import GetData from "../utils/getData";
import { useDispatch, useSelector } from "react-redux";
import { addComment, getComments, loadMoreItems } from "../provider/commentSlice";
import ReplyComment from "./replyComment";
import data from "../data";


function Comments() {
  const dispatch = useDispatch();
  const { items, itemsPerPage } = useSelector((state) => state.comments);
  useEffect(()=>{
   /* if (process.env.REACT_APP_API_ENDPOINT !== "") {
      const fetchData = async () => {
        try {
          const response = await fetch(process.env.REACT_APP_API_ENDPOINT);
  
          const data = await response.json();
          dispatch(getComments(data));
        } catch (error) {
          console.log("Error fetching data", error);
        }
      };
      fetchData()
    }*/
    dispatch(getComments(data));
  },[])
  useEffect(() => {
    dispatch(loadMoreItems());
  }, [dispatch, itemsPerPage]);

  const handleScroll = (e) => {
    const scrollHeight = e.target.documentElement.scrollHeight;
    const currentHeight = Math.ceil(
      e.target.documentElement.scrollTop + window.innerHeight
    );
    if (currentHeight >= scrollHeight) {
      dispatch(loadMoreItems());
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const submitComment = (data) => {
    const cm = {
      id: ulid(),
      body: data,
      username: "محسن",
      userId: "5",
      parentId: null,
      createdAt: Date.now(),
    };
    dispatch(addComment(cm));
  };

  return (
    <div>
      <CommentForm text="ارسال دیدگاه" submitComment={submitComment} />
      {items.map((item) => {
        if (item.parentId === null) {
          return (
            <React.Fragment key={item.id}>
              <SingleComment item={item} />
              <ReplyComment parentId={item.id} comments={items} />
            </React.Fragment>
          );
        }
      })}
    </div>
  );
}

export default Comments;
