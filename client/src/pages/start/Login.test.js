import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// Import the component to be tested
import Login from './Login';

// Mock the Firebase signInWithEmailAndPassword function
jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn(),
}));

describe('Login Component', () => {
  it('renders email and password input fields', () => {
    const { getByPlaceholderText } = render(<Login />);
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it('updates state on user input', () => {
    const { getByPlaceholderText } = render(<Login />);
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'test123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('test123');
  });

  it('calls signIn function on clicking "Sign in" button', () => {
    const { getByText, getByPlaceholderText } = render(<Login />);
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const signInButton = getByText('Sign in');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'test123' } });

    // Simulate successful sign-in by resolving the mock function
    signInWithEmailAndPassword.mockResolvedValueOnce({ user: { uid: 'test-user-id' } });

    fireEvent.click(signInButton);

    // Expect that the signInWithEmailAndPassword function was called with the correct arguments
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(expect.anything(), 'test@example.com', 'test123');
    // You can add more expectations based on your authentication logic
  });
});
