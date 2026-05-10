import { describe, expect, it, vi } from 'vitest';

import { fireEvent, render, screen } from '@testing-library/react';

import Button from './Button';

describe('Button', () => {
	it('renders button text', () => {
		render(<Button>Click Me</Button>);

		expect(screen.getByText('Click Me')).toBeInTheDocument();
	});

	it('handles click events', () => {
		const onClick = vi.fn();

		render(<Button onClick={onClick}>Submit</Button>);

		fireEvent.click(screen.getByText('Submit'));

		expect(onClick).toHaveBeenCalled();
	});
});
