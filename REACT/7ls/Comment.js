import React, { Component } from "react";
import CommentDetails from "./CommentDetails";

// Компонент Comment
class Comment extends Component {
  render() {
    const { comment, showDetails, onDelete } = this.props;
    return (
      <div className="bg-purple-50 p-4 rounded-lg shadow-md border border-purple-200 flex flex-col">
        <h3 className="text-xl font-semibold text-purple-800 mb-2">
          {comment.name}
        </h3>
        <p className="text-gray-700 text-sm mb-3">
          ID: {comment.id} | Post ID: {comment.postId}
        </p>

        {/* Умовний рендеринг деталей коментаря */}
        {showDetails && <CommentDetails comment={comment} />}

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

export default Comment;
