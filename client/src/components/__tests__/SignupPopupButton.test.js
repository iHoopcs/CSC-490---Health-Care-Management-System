import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignupPopupButton from '../SignupPopupButton';

afterEach(() => {
  cleanup();
})

test('should render signup button', () => {
  render(<SignupPopupButton />);
  const signupButtonElement = screen.getByTestId('signup-1');
  expect(signupButtonElement).toBeInTheDocument();
})
