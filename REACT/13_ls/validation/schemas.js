import * as Yup from "yup";

// Схема валідації для форми реєстрації
export const registrationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Ім'я занадто коротке!")
    .max(50, "Ім'я занадто довге!")
    .required("Ім'я є обов'язковим"),
  email: Yup.string()
    .email("Невірний формат email")
    .required("Email є обов'язковим"),
  password: Yup.string()
    .min(6, "Пароль має бути не менше 6 символів")
    .required("Пароль є обов'язковим"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Паролі повинні співпадати")
    .required("Підтвердження пароля є обов'язковим"),
  gender: Yup.string()
    .oneOf(["чоловік", "жінка", "інше"], "Виберіть стать")
    .required("Стать є обов'язковою"),
  subscribe: Yup.boolean(),
  favoriteColor: Yup.string()
    .oneOf(["червоний", "синій", "зелений"], "Виберіть улюблений колір")
    .required("Улюблений колір є обов'язковим"),
});

// Схема валідації для контактної форми
export const contactSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Ім'я занадто коротке!")
    .max(50, "Ім'я занадто довге!")
    .required("Ім'я є обов'язковим"),
  email: Yup.string()
    .email("Невірний формат email")
    .required("Email є обов'язковим"),
  subject: Yup.string()
    .min(5, "Тема занадто коротка!")
    .max(100, "Тема занадто довга!")
    .required("Тема є обов'язковою"),
  message: Yup.string()
    .min(10, "Повідомлення занадто коротке!")
    .required("Повідомлення є обов'язковим"),
});
