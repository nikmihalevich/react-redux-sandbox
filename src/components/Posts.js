import React from "react";
import { connect } from "react-redux";
import Post from "./Post";

const Posts = ({ syncPost }) => {
  if (!syncPost.length) return <p className="text-center">No posts yet</p>;
  return syncPost.map((post) => <Post key={post.id} post={post} />);
};

const mapStateToProps = (state) => {
  return {
    syncPost: state.posts.posts,
  };
};

export default connect(mapStateToProps, null)(Posts);
