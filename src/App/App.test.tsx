import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('tests work', () => {
  const { getByText } = render(<App />);
  const text = getByText(/send it/i);

  expect(text).toBeInTheDocument();
});
