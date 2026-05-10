import { describe, expect, it } from 'vitest';

import { formatCurrency, mapStatusLabel, calculateTierPrice } from './helpers';

describe('helper utilities', () => {
	it('formats currency correctly', () => {
		expect(formatCurrency(1200)).toBe('$1,200.00');
	});

	it('maps status labels correctly', () => {
		expect(mapStatusLabel('active')).toBe('Active');

		expect(mapStatusLabel('trial')).toBe('Trial');
	});

	it('calculates tier pricing', () => {
		expect(
			calculateTierPrice({
				quantity: 5,
				unitPrice: 20,
			}),
		).toBe(100);
	});
});
