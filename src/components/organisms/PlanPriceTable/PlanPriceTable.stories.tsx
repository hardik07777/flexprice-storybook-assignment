import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { MemoryRouter } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import PlanPriceTable from './PlanPriceTable';

/**
 * PlanPriceTable displays pricing and charge
 * information associated with subscription plans.
 *
 * Supports:
 * - recurring and usage pricing
 * - paginated charge tables
 * - dashboard pricing layouts
 * - query-powered data rendering
 */

const queryClient = new QueryClient();

const mockPlan = {
	id: 'plan_pro',
	name: 'Pro Plan',
} as any;

const meta = {
	title: 'Organisms/PlanPriceTable',

	component: PlanPriceTable,

	parameters: {
		layout: 'fullscreen',
	},

	tags: ['autodocs'],

	decorators: [
		(Story) => (
			<QueryClientProvider client={queryClient}>
				<MemoryRouter>
					<div className='min-h-screen bg-background p-6'>
						<Story />
					</div>
				</MemoryRouter>
			</QueryClientProvider>
		),
	],

	args: {
		plan: mockPlan,
	},

	argTypes: {
		plan: {
			control: 'object',
		},
	},
} satisfies Meta<typeof PlanPriceTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DashboardView: Story = {
	parameters: {
		layout: 'fullscreen',
	},
};

export const InteractionTest: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		await expect(canvas.getByText(/Pro Plan/i)).toBeInTheDocument();
	},
};
