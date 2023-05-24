import { render } from '@testing-library/react-native';
import * as React from 'react';

import { HeaderTitle } from '../HeaderTitle';

describe('HeaderTitle', () => {
  const getRenderedComponent = () => render(<HeaderTitle children={'Title'} />);

  it(`should render correctly`, () => {
    expect(getRenderedComponent().toJSON()).toMatchSnapshot();
  });
});
