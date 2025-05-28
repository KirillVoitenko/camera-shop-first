import * as yup from 'yup';
import { RatingValidRange } from './const';

export const newCommentValidationSchema = yup.object().shape({
  cameraId: yup.number()
    .required()
    .positive(),
  userName: yup.string()
    .required('Нужно указать имя'),
  advantage: yup.string()
    .required('Нужно указать достоинства'),
  disadvantage: yup.string()
    .required('Нужно указать недостатки'),
  rating: yup.number()
    .required('Нужно оценить товар')
    .min(RatingValidRange.Minimal, 'Нужно оценить товар')
    .max(RatingValidRange.Maximal, 'Нужно оценить товар'),
  review: yup.string()
    .required('Нужно добавить комментарий')
    .min(5, 'Минимальная длина - 5 символов')
});
