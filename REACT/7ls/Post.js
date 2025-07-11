import React, { Component } from "react";
import PostDetails from "./PostDetails";

// Компонент Post
class Post extends Component {
  render() {
    const { post, showDetails, onDelete } = this.props;
    return (
      <div className="bg-green-50 p-4 rounded-lg shadow-md border border-green-200 flex flex-col">
        <h3 className="text-xl font-semibold text-green-800 mb-2">
          {post.title}
        </h3>
        <p className="text-gray-700 text-sm mb-3">
          ID: {post.id} | Автор (User ID): {post.userId}
        </p>

        {/* Умовний рендеринг деталей посту */}
        {showDetails && <PostDetails post={post} />}

        <button
          onClick={onDelete}
          className="mt-auto self-end px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200 text-sm font-medium shadow-sm"
        >
          Видалити
        </button>
      </div>
    );
  }
}

export default Post;
