import { render } from '@testing-library/react';
import { CommentCard } from '../comment-card';
import { generateCommentMock } from '@test-utills/mocks/comment';

const COMMENT_MOCK = generateCommentMock();
const RATING_COMPONENT_TEST_ID = 'rate-container';


describe('Component \'CommentCard\'', () => {
  it('should correct render', () => {
    const screen = render(<CommentCard comment={COMMENT_MOCK}/>);

    expect(screen.getByTestId(RATING_COMPONENT_TEST_ID)).toBeInTheDocument();
    expect(screen.getByText(COMMENT_MOCK.advantage)).toBeInTheDocument();
    expect(screen.getByText(COMMENT_MOCK.disadvantage)).toBeInTheDocument();
    expect(screen.getByText(COMMENT_MOCK.review)).toBeInTheDocument();
    expect(screen.getByText(COMMENT_MOCK.userName)).toBeInTheDocument();
  });
});
