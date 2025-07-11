import React, { Component } from "react";
import UserDetails from "./UserDetails";

// Компонент User
class User extends Component {
  render() {
    const { user, showDetails, onDelete } = this.props;
    return (
      <div className="bg-blue-50 p-4 rounded-lg shadow-md border border-blue-200 flex flex-col">
        <h3 className="text-xl font-semibold text-blue-800 mb-2">
          {user.name}
        </h3>
        <p className="text-gray-700 text-sm mb-3">ID: {user.id}</p>

        {/* Умовний рендеринг деталей користувача */}
        {showDetails && <UserDetails user={user} />}

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

export default User;
