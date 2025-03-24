import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  tel: yup.string()
    .required('Введите номер телефона')
    .test('is-phone', 'Неверный формат телефона', (value) => /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(value)),
});
