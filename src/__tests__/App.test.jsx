import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  test('renders without crashing', () => {
    render(<App />);
    expect(screen.getByText(/TradeAI Global/i)).toBeInTheDocument();
  });
});
