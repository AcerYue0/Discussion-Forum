import React from "react";
import { Link } from "react-router-dom";

const Posts = (props) => {
  const { posts } = props;
  return (
    <div className="list-group">
      {posts.map((post) => (
        <Link
          className="list-group-item list-group-item-action flex-column align-items-start"
          to={`/post/${post.QuestionId}`}
        >
          <div className="d-flex w-100 justify-content-between" key={post.QuestionId}>
            <h5 className="mb-1">{post.content[0]}</h5>
          </div>
          <small>Created by {post.UserId}</small>
          <br />
          <div className="mt-1">
            Related Topics:
            {post.tags.map((tag) => (
              <span className="badge badge-secondary m-1 p-2">{tag.name}</span>
            ))}
          </div>
        </Link>
      ))}
    </div>
  );
};

// If needed to implement put between line 22~23
// <h6 className="mt-2">
// {post.upvotes.length} Likes | {post.views} Views
// </h6> 

export default Posts;
