import { RatingCaption, RatingValue } from '@shared/model/enums';
import { ElementSize } from '@shared/model/html';

export const COMMENT_CARD_TEST_ID = 'comment-card-container';

export enum RatingValidRange {
  Minimal = 1,
  Maximal = 5
}

type NewCommentIconConfig = {
  id: string;
  size: ElementSize;
}

type RatingInputConfig = {
  value: RatingValue;
  caption: RatingCaption;
  id: string;
}

export const NEW_COMMENT_ICON_CONFIG: NewCommentIconConfig = {
  id: '#icon-snowflake',
  size: {
    height: 9,
    width: 9
  }
};

const createRatingInputConfig = (value: RatingValue, caption: RatingCaption): RatingInputConfig => ({
  caption,
  id: `star-${value}`,
  value
});

export const RATING_INPUTS_CONFIG: RatingInputConfig[] = [
  createRatingInputConfig(RatingValue.Excellent, RatingCaption.Excellent),
  createRatingInputConfig(RatingValue.Good, RatingCaption.Good),
  createRatingInputConfig(RatingValue.Normal, RatingCaption.Normal),
  createRatingInputConfig(RatingValue.Bad, RatingCaption.Bad),
  createRatingInputConfig(RatingValue.Terrible, RatingCaption.Terrible)
];
