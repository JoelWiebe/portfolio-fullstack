import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Button from '../Button';

describe('Button component', () => {
  it('renders correctly with children', () => {
    // Arrange: Render the component with text content
    render(<Button>Click Me</Button>);

    // Act: Find the button on the screen
    const buttonElement = screen.getByRole('button', { name: /click me/i });

    // Assert: Check if the button is in the document
    expect(buttonElement).toBeInTheDocument();
  });

  it('calls the onClick handler when clicked', async () => {
    // Arrange
    const user = userEvent.setup();
    const handleClick = vi.fn(); // Create a mock function (a "spy")
    render(<Button onClick={handleClick}>Click Me</Button>);
    const buttonElement = screen.getByRole('button', { name: /click me/i });

    // Act: Simulate a user clicking the button
    await user.click(buttonElement);

    // Assert: Check if our mock function was called
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when the disabled prop is true', () => {
    render(<Button disabled>Click Me</Button>);
    const buttonElement = screen.getByRole('button', { name: /click me/i });
    expect(buttonElement).toBeDisabled();
  });
});