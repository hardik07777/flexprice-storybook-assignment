import { describe, expect, it, vi } from 'vitest';

import { fireEvent, render, screen } from '@testing-library/react';

import Checkbox from './Checkbox';

describe('Checkbox', () => {
	it('renders checkbox label', () => {
		render(<Checkbox checked={false} label='Accept Terms' />);

		expect(screen.getByText('Accept Terms')).toBeInTheDocument();
	});

	it('handles checked changes', () => {
		const onCheckedChange = vi.fn();

		render(<Checkbox checked={false} onCheckedChange={onCheckedChange} label='Enable' />);

		fireEvent.click(screen.getByRole('checkbox'));

		expect(onCheckedChange).toHaveBeenCalled();
	});
});
