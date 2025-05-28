import { NEW_COMMENT_ICON_CONFIG, RATING_INPUTS_CONFIG, RatingValidRange } from '@entities/comment/config/const';
import { NewComment } from '@entities/comment/model/types';
import { Nullable } from '@shared/model/utill-types';
import { SvgIcon } from '@shared/ui/svg-icon';
import classNames from 'classnames';
import { Fragment, JSX } from 'react';
import { FieldError, UseFormRegister, UseFormWatch } from 'react-hook-form';

type RatingInputProps = {
  register: UseFormRegister<NewComment>;
  watch: UseFormWatch<NewComment>;
  error?: Nullable<FieldError>;
}

export function RatingInput({ register, watch, error }: RatingInputProps): JSX.Element {
  const fieldsetClassName = classNames('rate form-review__item', {
    'is-invalid': !!error
  });

  const ratingValue = watch('rating') ?? 0;


  return (
    <fieldset
      className={fieldsetClassName}
      data-testid='new-comment-rating'
    >
      <legend className='rate__caption'>
        Рейтинг
        <SvgIcon
          size={NEW_COMMENT_ICON_CONFIG.size}
          xlinkHref={NEW_COMMENT_ICON_CONFIG.id}
        />
      </legend>
      <div className='rate__bar'>
        <div className='rate__group'>
          {RATING_INPUTS_CONFIG.map((current) => (
            <Fragment key={current.id}>
              <input
                className='visually-hidden'
                id={current.id}
                type='radio'
                {...register('rating', {
                  valueAsNumber: true,
                })}
                value={current.value}
              />
              <label
                className='rate__label'
                htmlFor={current.id}
                title={current.caption}
              />
            </Fragment>
          ))}
        </div>
        {error?.message && <p className='rate__message'>{error.message}</p>}
      </div>
      <div className='rate__progress'>
        <span className='rate__stars'>{ratingValue}</span>
        <span>&nbsp;/&nbsp;</span>
        <span className='rate__all-stars'>{RatingValidRange.Maximal}</span>
      </div>
    </fieldset>
  );
}
