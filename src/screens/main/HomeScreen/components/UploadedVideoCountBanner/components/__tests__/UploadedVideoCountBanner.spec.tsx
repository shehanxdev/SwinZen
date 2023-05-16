import { render } from '@testing-library/react-native';
import * as React from 'react';

import { Color } from '@sz/constants';

import { VideoCountCard, VideoCountCardProps } from '../VideoCountCard';

describe('VideoCountCard Component', () => {
  const count = 24;
  const description = 'random description';
  const videoCountCardTestData: Array<Partial<VideoCountCardProps>> = [
    {
      backgroundColor: Color.Neutral.Sz1000,
      countTextColor: Color.Secondary.Sz200,
      descriptionTextColor: Color.Tertiary.Sz400,
    },
    {
      backgroundColor: Color.Neutral.Sz1000,
      countTextColor: Color.Secondary.Sz200,
      descriptionTextColor: Color.Tertiary.Sz400,
    },
  ];

  const getRenderedComponent = (props?: Partial<VideoCountCardProps>) =>
    render(<VideoCountCard count={count} description={description} {...props} />);

  describe(`should render Component correctly`, () => {
    for (const data of videoCountCardTestData) {
      it(`should render correctly with ${JSON.stringify(data)}`, () => {
        const rendered = getRenderedComponent({ ...data });
        const renderedTree = rendered.toJSON();
        expect(renderedTree).toMatchSnapshot();
      });
    }
  });
});
