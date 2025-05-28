import { NEW_COMMENT_ICON_CONFIG } from '@entities/comment/config/const';
import { NewComment } from '@entities/comment/model/types';
import { SvgIcon } from '@shared/ui/svg-icon';
import classNames from 'classnames';
import { ComponentProps, ElementType, JSX } from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';

type CommmentFormInputBaseProps<TElementType extends ElementType = ElementType> = {
  caption: string;
  register: UseFormRegister<NewComment>;
  name: keyof NewComment;
  error?: FieldError;
  as?: TElementType;
};

type CommentFormInputProps<TElementType extends ElementType> = CommmentFormInputBaseProps<TElementType>
  & Omit<ComponentProps<TElementType>, keyof CommmentFormInputBaseProps<TElementType>>;

const DEFAULT_ELEMENT = 'input';

export function CommentFormInput<TElementType extends ElementType = typeof DEFAULT_ELEMENT>({
  register,
  caption,
  name,
  error,
  as,
  ...otherProps
}: CommentFormInputProps<TElementType>): JSX.Element {
  const TagName = as || DEFAULT_ELEMENT;
  const containerClassName = classNames(`custom-${TagName.toString()} form-review__item`, {
    'is-invalid': !!error,
  });

  return (
    <div className={containerClassName}>
      <label>
        <span className={`custom-${TagName.toString()}__label`}>
          {caption}
          <SvgIcon
            size={NEW_COMMENT_ICON_CONFIG.size}
            xlinkHref={NEW_COMMENT_ICON_CONFIG.id}
          />
        </span>
        <TagName
          {...register(name)}
          {...otherProps}
        />
        {error?.message && (
          <p className={`custom-${TagName.toString()}__error`}>
            {error.message}
          </p>
        )}
      </label>
    </div>
  );
}
