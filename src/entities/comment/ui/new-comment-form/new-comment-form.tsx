/* eslint-disable @typescript-eslint/no-misused-promises */
import { Classed } from '@shared/model/style-types';
import classNames from 'classnames';
import { JSX } from 'react';
import { NewComment } from '@entities/comment/model/types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { newCommentValidationSchema } from '@entities/comment/config/validation';
import { RatingInput } from './rating-input';
import { CommentFormInput } from './comment-form-input';

type NewCommentProps = Classed<{
  productId: number;
  onSubmit: (data: NewComment) => Promise<void>;
}>;

const INITIAL_FORM_VALUE: NewComment = {
  advantage: '',
  cameraId: 0,
  disadvantage: '',
  rating: 0,
  review: '',
  userName: ''
};

export function NewCommentForm({ className, productId, onSubmit }: NewCommentProps): JSX.Element {
  const containerClassName = classNames('form-review', className);
  const {
    register,
    watch,
    handleSubmit,
    formState: { isValid: isValidForm, errors, isLoading, isSubmitting }
  } = useForm<NewComment>({
    defaultValues: {
      ...INITIAL_FORM_VALUE,
      cameraId: productId
    },
    mode: 'onBlur',
    resolver: yupResolver(newCommentValidationSchema)
  });

  return (
    <div className={containerClassName}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <RatingInput
          register={register}
          watch={watch}
          error={errors?.rating}
        />
        <CommentFormInput
          caption='Ваше имя'
          name='userName'
          register={register}
          type='text'
          placeholder='Введите ваше имя'
          error={errors?.userName}
        />
        <CommentFormInput
          caption='Достоинства'
          name='advantage'
          register={register}
          type='text'
          placeholder='Основные преимущества товара'
          error={errors?.advantage}
        />
        <CommentFormInput
          caption='Недостатки'
          name='disadvantage'
          register={register}
          type='text'
          placeholder='Главные недостатки товара'
          error={errors?.disadvantage}
        />
        <CommentFormInput
          caption='Комментарий'
          name='review'
          register={register}
          placeholder='Поделитесь своим опытом покупки'
          error={errors?.review}
          as='textarea'
        />
        <button
          className='btn btn--purple form-review__btn'
          type='submit'
          disabled={isLoading || isSubmitting || !isValidForm}
        >
          Отправить отзыв
        </button>
      </form>
    </div>
  );
}
