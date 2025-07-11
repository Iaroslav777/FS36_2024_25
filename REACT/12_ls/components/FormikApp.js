import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import RegistrationForm from "./RegistrationForm";
import ContactForm from "./ContactForm";

// Головний компонент для демонстрації форм Formik та роутінгу
function FormikApp() {
  return (
    <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-4xl">
      <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-8">
        Formik, Yup та React Router
      </h1>

      {/* Навігаційне меню */}
      <nav className="flex justify-center space-x-6 mb-8 p-4 bg-gray-100 rounded-lg shadow-sm">
        <Link
          to="/"
          className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors font-medium"
        >
          Головна
        </Link>
        <Link
          to="/register"
          className="px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition-colors font-medium"
        >
          Реєстрація
        </Link>
        <Link
          to="/contact"
          className="px-4 py-2 rounded-md bg-purple-500 text-white hover:bg-purple-600 transition-colors font-medium"
        >
          Контакти
        </Link>
      </nav>

      {/* Область для відображення компонентів за маршрутом */}
      <div className="mt-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/contact" element={<ContactForm />} />
        </Routes>
      </div>
    </div>
  );
}

export default FormikApp;
