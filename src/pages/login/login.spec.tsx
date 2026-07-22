import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginPage from './login';

describe('Login page', () => {
    it('renders the brand logo', () => {
        render(<LoginPage />);
        expect(screen.getByText('PIZZA')).toBeInTheDocument();
    });

    it('renders the "Sign in" title', () => {
        render(<LoginPage />);
        expect(screen.getByText('Sign in')).toBeInTheDocument();
    });

    it('renders the username and password fields', () => {
        render(<LoginPage />);
        expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    });

    it('renders the "Remember me" checkbox checked by default', () => {
        render(<LoginPage />);
        const checkbox = screen.getByRole('checkbox', { name: 'Remember me' });
        expect(checkbox).toBeInTheDocument();
        expect(checkbox).toBeChecked();
    });

    it('renders the "Forgot password" link', () => {
        render(<LoginPage />);
        expect(
            screen.getByRole('link', { name: 'Forgot password' }),
        ).toBeInTheDocument();
    });

    it('renders the "Log in" submit button', () => {
        render(<LoginPage />);
        expect(
            screen.getByRole('button', { name: 'Log in' }),
        ).toBeInTheDocument();
    });

    it('lets the user type into the username and password fields', async () => {
        const user = userEvent.setup();
        render(<LoginPage />);

        const username = screen.getByPlaceholderText('Username');
        const password = screen.getByPlaceholderText('Password');

        await user.type(username, 'pizza-admin');
        await user.type(password, 'secret123');

        expect(username).toHaveValue('pizza-admin');
        expect(password).toHaveValue('secret123');
    });

    it('toggles the "Remember me" checkbox off when clicked', async () => {
        const user = userEvent.setup();
        render(<LoginPage />);

        const checkbox = screen.getByRole('checkbox', { name: 'Remember me' });
        expect(checkbox).toBeChecked();

        await user.click(checkbox);
        expect(checkbox).not.toBeChecked();
    });

    it('toggles password visibility with the eye icon', async () => {
        const user = userEvent.setup();
        render(<LoginPage />);

        const password = screen.getByPlaceholderText('Password');
        expect(password).toHaveAttribute('type', 'password');

        await user.click(screen.getByLabelText('eye-invisible'));
        expect(password).toHaveAttribute('type', 'text');
    });

    it('shows validation errors when submitting an empty form', async () => {
        const user = userEvent.setup();
        render(<LoginPage />);

        await user.click(screen.getByRole('button', { name: 'Log in' }));

        expect(
            await screen.findByText('Please input your Username!'),
        ).toBeInTheDocument();
        expect(
            await screen.findByText('Please input your Password!'),
        ).toBeInTheDocument();
    });

    it('does not show validation errors when both fields are filled', async () => {
        const user = userEvent.setup();
        render(<LoginPage />);

        await user.type(screen.getByPlaceholderText('Username'), 'pizza-admin');
        await user.type(screen.getByPlaceholderText('Password'), 'secret123');
        await user.click(screen.getByRole('button', { name: 'Log in' }));

        expect(
            screen.queryByText('Please input your Username!'),
        ).not.toBeInTheDocument();
        expect(
            screen.queryByText('Please input your Password!'),
        ).not.toBeInTheDocument();
    });
});
