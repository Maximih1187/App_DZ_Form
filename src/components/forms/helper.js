import * as Yup from 'yup';

export const schemas = {
      custom: Yup.object().shape({
            name: Yup.string()
                  .min(6, 'не менее 6 символов')
                  .max(10, 'не более 10 символов')
                  .required('Не может быть пустым'),
            email: Yup.string()
                  .email('Не правильный формат email адреса')
                  .required('Не может быть пустым'),
            password: Yup.string()
                  .min(6, 'не менее 6 цифр')
                  .max(10, 'не более 10 цифр')
                  .required('Не может быть пустым')
      })
}

export const initialValues = {
      name: "",
      email: "",
      password: "",
}
