export const formatCurrency = (amount: number) => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format(amount);
};

export const mapStatusLabel = (status: string) => {
	const mapping: Record<string, string> = {
		active: 'Active',
		inactive: 'Inactive',
		trial: 'Trial',
	};

	return mapping[status] || 'Unknown';
};

export const calculateTierPrice = ({ quantity, unitPrice }: { quantity: number; unitPrice: number }) => {
	return quantity * unitPrice;
};
