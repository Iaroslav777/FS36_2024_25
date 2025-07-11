import React, { Component } from "react";
import User from "./User";
import Post from "./Post";
import Comment from "./Comment";
import { initialUsers, initialPosts, initialComments } from "../constants/data"; // Імпортуємо дані

// Компонент Content
class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: initialUsers,
      posts: initialPosts,
      comments: initialComments,
      showDetails: false, // Стан для умовного рендерингу деталей
    };
  }

  // Метод для видалення елемента за ID та типом
  handleDelete = (type, id) => {
    this.setState((prevState) => ({
      [type]: prevState[type].filter((item) => item.id !== id),
    }));
  };

  // Метод для перемикання видимості деталей
  toggleDetails = () => {
    this.setState((prevState) => ({
      showDetails: !prevState.showDetails,
    }));
  };

  render() {
    const { users, posts, comments, showDetails } = this.state;

    return (
      <main className="flex-grow p-6 bg-gray-50 w-full max-w-4xl mx-auto rounded-lg shadow-lg my-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Основний Контент
        </h1>

        {/* Кнопка Show/Hide Details */}
        <div className="mb-8 text-center">
          <button
            onClick={this.toggleDetails}
            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-200"
          >
            {showDetails ? "Приховати Деталі" : "Показати Деталі"}
          </button>
        </div>

        {/* Секція Користувачів */}
        <section className="mb-10 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-3xl font-semibold mb-6 text-blue-700 text-center">
            Користувачі
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.length > 0 ? (
              users.map((user) => (
                <User
                  key={user.id}
                  user={user}
                  showDetails={showDetails}
                  onDelete={() => this.handleDelete("users", user.id)}
                />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                Немає користувачів для відображення.
              </p>
            )}
          </div>
        </section>

        {/* Секція Постів */}
        <section className="mb-10 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-3xl font-semibold mb-6 text-green-700 text-center">
            Пости
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.length > 0 ? (
              posts.map((post) => (
                <Post
                  key={post.id}
                  post={post}
                  showDetails={showDetails}
                  onDelete={() => this.handleDelete("posts", post.id)}
                />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                Немає постів для відображення.
              </p>
            )}
          </div>
        </section>

        {/* Секція Коментарів */}
        <section className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-3xl font-semibold mb-6 text-purple-700 text-center">
            Коментарі
          </h2>
          <div className="grid grid-cols-1 gap-6">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <Comment
                  key={comment.id}
                  comment={comment}
                  showDetails={showDetails}
                  onDelete={() => this.handleDelete("comments", comment.id)}
                />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                Немає коментарів для відображення.
              </p>
            )}
          </div>
        </section>
      </main>
    );
  }
}

export default Content;
