import React, { Component } from "react";

// Компонент PostDetails
class PostDetails extends Component {
  render() {
    const { post } = this.props;
    return (
      <div className="mt-3 pt-3 border-t border-green-200 text-sm text-gray-600">
        <p>
          <strong>Текст:</strong> {post.body}
        </p>
      </div>
    );
  }
}

export default PostDetails;
