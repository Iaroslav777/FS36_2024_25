import React from "react";
import { useFormik } from "formik";
import { contactSchema } from "../validation/schemas"; // Імпортуємо схему валідації

// Компонент контактної форми (Formik + Yup)
function ContactForm() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    validationSchema: contactSchema, // Підключаємо Yup схему
    onSubmit: (values) => {
      console.log("Дані контактної форми:", values);
      alert("Контактна форма успішно відправлена! Перевірте консоль.");
      formik.resetForm(); // Очищаємо форму після відправки
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="space-y-6 p-6 border border-gray-200 rounded-lg shadow-sm bg-white"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Контактна Форма (Formik)
      </h2>

      {/* Поле для імені */}
      <div>
        <label
          htmlFor="contactName"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Ім'я:
        </label>
        <input
          type="text"
          id="contactName"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
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
          htmlFor="contactEmail"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email:
        </label>
        <input
          type="email"
          id="contactEmail"
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

      {/* Поле для теми */}
      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Тема:
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.subject}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Тема вашого повідомлення"
        />
        {formik.touched.subject && formik.errors.subject ? (
          <div className="text-red-500 text-xs mt-1">
            {formik.errors.subject}
          </div>
        ) : null}
      </div>

      {/* Поле для повідомлення (textarea) */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Повідомлення:
        </label>
        <textarea
          id="message"
          name="message"
          rows="4"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.message}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y"
          placeholder="Напишіть ваше повідомлення тут..."
        ></textarea>
        {formik.touched.message && formik.errors.message ? (
          <div className="text-red-500 text-xs mt-1">
            {formik.errors.message}
          </div>
        ) : null}
      </div>

      {/* Кнопка відправки */}
      <button
        type="submit"
        className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        disabled={formik.isSubmitting}
      >
        Відправити Контакт
      </button>
    </form>
  );
}

export default ContactForm;
 