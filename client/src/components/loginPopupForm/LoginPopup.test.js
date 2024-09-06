// src/Login.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from './LoginPopup';

/**
 * Testing for login page
 */

describe('Login component', () => {
    let consoleLogSpy;

    beforeAll(() => {
        // Mock console.log
        consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterAll(() => {
        // Restore the original console.log
        consoleLogSpy.mockRestore();
    });

    test('renders Login form with all elements', () => {
        render(<Login />);
    
        // Get specific elements using more precise queries
        const loginHeading = screen.getByRole('heading', { name: /login/i });
        const usernameLabel = screen.getByLabelText(/username/i);
        const passwordLabel = screen.getByLabelText(/password/i);
        const submitButton = screen.getByRole('button', { name: /login/i });
    
        expect(loginHeading).toBeInTheDocument();
        expect(usernameLabel).toBeInTheDocument();
        expect(passwordLabel).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    });
    
    

    test('updates username and password on input change', () => {
        render(<Login />);
        const usernameInput = screen.getByLabelText(/username/i);
        const passwordInput = screen.getByLabelText(/password/i);
    
        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
        expect(usernameInput.value).toBe('testuser');
        expect(passwordInput.value).toBe('password123');
    });
    

    test('submits the form with username and password', () => {
        render(<Login />);

        // Find the username and password input fields and the submit button
        const usernameInput = screen.getByLabelText(/username/i);
        const passwordInput = screen.getByLabelText(/password/i);
        const submitButton = screen.getByRole('button', { name: /login/i });

        // Simulate user input
        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        // Simulate form submission
        fireEvent.click(submitButton);

        // Check if console.log was called with the correct arguments
        expect(consoleLogSpy).toHaveBeenCalledWith('Username:', 'testuser');
        expect(consoleLogSpy).toHaveBeenCalledWith('Password:', 'password123');
    });
});