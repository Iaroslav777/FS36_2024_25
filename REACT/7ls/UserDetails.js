import React, { Component } from "react";

// Компонент UserDetails
class UserDetails extends Component {
  render() {
    const { user } = this.props;
    return (
      <div className="mt-3 pt-3 border-t border-blue-200 text-sm text-gray-600">
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Телефон:</strong> {user.phone}
        </p>
        <p>
          <strong>Вебсайт:</strong>{" "}
          <a
            href={`http://${user.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {user.website}
          </a>
        </p>
      </div>
    );
  }
}

export default UserDetails;
