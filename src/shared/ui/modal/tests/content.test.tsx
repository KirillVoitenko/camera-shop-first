import { render } from '@testing-library/react';
import { Content } from '../content';
import faker from 'faker';
import { ComponentProps } from 'react';

const FAKE_TITLE = faker.lorem.word();
const FAKE_TEXT = faker.lorem.paragraph();

describe('Component \'Content\'', () => {
  it('should correct render', () => {
    const contentPropsMock: ComponentProps<typeof Content> = {
      title: FAKE_TITLE
    };

    const screen = render(
      <Content {...contentPropsMock}>
        <p>{FAKE_TEXT}</p>
      </Content>
    );

    expect(screen.getByText(FAKE_TITLE)).toBeInTheDocument();
    expect(screen.getByText(FAKE_TEXT)).toBeInTheDocument();
  });
});
