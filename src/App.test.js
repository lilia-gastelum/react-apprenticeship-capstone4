import { render, screen } from '@testing-library/react';
import App from './App';

describe("App component", () => {
    test("the title is rendered correctly in the header", async () => {
        render(<App />);
        const title = screen.getByText(/Wize Home/i);
        expect(title).toBeInTheDocument();
      });
});
