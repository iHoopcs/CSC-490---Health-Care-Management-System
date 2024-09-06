import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Popup from '../Popup';

afterEach(() => {
  cleanup();
})

test('should render Popup', () => {
  render(<Popup trigger={true} />);
  const popupElement = screen.getByTestId('popup-1');
  expect(popupElement).toBeInTheDocument();
})
