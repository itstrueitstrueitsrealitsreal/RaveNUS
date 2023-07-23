import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Index from './Index'; // Replace './Index' with the correct path to your component file.

// Mock the setInterval function to avoid actually updating the time during tests
jest.useFakeTimers();

describe('Index component', () => {
  it('renders the correct time in 24-hour format with seconds', () => {
    render(<Index />);
    const timeElement = screen.getByTestId('time');
    const regexPattern = /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;
    expect(timeElement.textContent).toMatch(regexPattern);
  });

  it('renders a quote with a person attribution', () => {
    render(<Index />);
    const quoteElement = screen.getByTestId('quote');
    const personElement = screen.getByTestId('person');
    expect(quoteElement.textContent).toMatch(/".*"/); // Quote is wrapped in double quotes
    expect(personElement.textContent).toMatch(/-.*/); // Person attribution starts with a hyphen
  });
});
