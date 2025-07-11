import React from "react";
import { useFormik } from "formik";
import { registrationSchema } from "../validation/schemas"; // Імпортуємо схему валідації

// Компонент форми реєстрації (Formik + Yup)
function RegistrationForm() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "чоловік",
      subscribe: false,
      favoriteColor: "",
    },
    validationSchema: registrationSchema, // Підключаємо Yup схему
    onSubmit: (values) => {
      console.log("Дані форми реєстрації:", values);
      alert("Форма реєстрації успішно відправлена! Перевірте консоль.");
      formik.resetForm(); // Очищаємо форму після відправки
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="space-y-6 p-6 border border-gray-200 rounded-lg shadow-sm bg-white"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Форма Реєстрації (Formik)
      </h2>

      {/* Поле для імені */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Ім'я:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur} // Для відображення помилок при втраті фокусу
          value={formik.values.name}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Ваше ім'я"
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="text-red-500 text-xs mt-1">{formik.errors.name}</div>
        ) : null}
      </div>

      {/* Поле для email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="your.email@example.com"
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-500 text-xs mt-1">{formik.errors.email}</div>
        ) : null}
      </div>

      {/* Поле для пароля */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Пароль:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Ваш пароль"
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-500 text-xs mt-1">
            {formik.errors.password}
          </div>
        ) : null}
      </div>

      {/* Поле для підтвердження пароля */}
      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Підтвердіть пароль:
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Підтвердіть пароль"
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div className="text-red-500 text-xs mt-1">
            {formik.errors.confirmPassword}
          </div>
        ) : null}
      </div>

      {/* Вибір статі (select) */}
      <div>
        <label
          htmlFor="gender"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Стать:
        </label>
        <select
          id="gender"
          name="gender"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.gender}
          className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="чоловік">Чоловік</option>
          <option value="жінка">Жінка</option>
          <option value="інше">Інше</option>
        </select>
        {formik.touched.gender && formik.errors.gender ? (
          <div className="text-red-500 text-xs mt-1">
            {formik.errors.gender}
          </div>
        ) : null}
      </div>

      {/* Чекбокс для підписки */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="subscribe"
          name="subscribe"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          checked={formik.values.subscribe}
          className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
        />
        <label htmlFor="subscribe" className="ml-2 text-sm text-gray-700">
          Підписатися на розсилку
        </label>
      </div>

      {/* Радіо кнопки для улюбленого кольору */}
      <div>
        <span className="block text-sm font-medium text-gray-700 mb-2">
          Улюблений колір:
        </span>
        <div className="flex items-center space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="favoriteColor"
              value="червоний"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              checked={formik.values.favoriteColor === "червоний"}
              className="form-radio h-4 w-4 text-red-600 cursor-pointer"
            />
            <span className="ml-2 text-gray-700">Червоний</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="favoriteColor"
              value="синій"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              checked={formik.values.favoriteColor === "синій"}
              className="form-radio h-4 w-4 text-blue-600 cursor-pointer"
            />
            <span className="ml-2 text-gray-700">Синій</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="favoriteColor"
              value="зелений"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              checked={formik.values.favoriteColor === "зелений"}
              className="form-radio h-4 w-4 text-green-600 cursor-pointer"
            />
            <span className="ml-2 text-gray-700">Зелений</span>
          </label>
        </div>
        {formik.touched.favoriteColor && formik.errors.favoriteColor ? (
          <div className="text-red-500 text-xs mt-1">
            {formik.errors.favoriteColor}
          </div>
        ) : null}
      </div>

      {/* Кнопка відправки */}
      <button
        type="submit"
        className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        disabled={formik.isSubmitting} // Деактивуємо кнопку під час відправки
      >
        Відправити Реєстрацію
      </button>
    </form>
  );
}

export default RegistrationForm;
