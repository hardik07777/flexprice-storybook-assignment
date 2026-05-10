import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import { MemoryRouter } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Plus } from 'lucide-react';

import EmptyPage from './EmptyPage';

/**
 * EmptyPage component for onboarding,
 * zero-state experiences, and tutorial-driven pages.
 *
 * Supports:
 * - customizable empty state cards
 * - onboarding/tutorial sections
 * - page CTA actions
 * - dashboard-style layouts
 */

const queryClient = new QueryClient();

const tutorials = [
	{
		title: 'Getting Started with Billing',
		imageUrl: 'https://mintlify.s3.us-west-1.amazonaws.com/flexprice/UsageBaseMetering(1).jpg',
		onClick: () => console.log('Tutorial clicked'),
	},
	{
		title: 'Usage Based Pricing',
		imageUrl: 'https://mintlify.s3.us-west-1.amazonaws.com/flexprice/UsageBaseMetering(1).jpg',
		onClick: () => console.log('Tutorial clicked'),
	},
	{
		title: 'Meter Configuration',
		imageUrl: 'https://mintlify.s3.us-west-1.amazonaws.com/flexprice/UsageBaseMetering(1).jpg',
		onClick: () => console.log('Tutorial clicked'),
	},
];

const meta: Meta<typeof EmptyPage> = {
	title: 'Organisms/EmptyPage',

	component: EmptyPage,

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

	argTypes: {
		heading: {
			control: 'text',
		},

		addButtonLabel: {
			control: 'text',
		},
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		tags: undefined,

		heading: 'Plans',

		addButtonLabel: 'Create Plan',

		onAddClick: () => console.log('Create clicked'),

		emptyStateCard: {
			icon: <Plus className='size-10 text-gray-400' />,

			heading: 'No Plans Found',

			description: 'Create your first pricing plan to start managing subscriptions.',

			buttonLabel: 'Create Plan',

			buttonAction: () => console.log('Create Plan'),
		},

		tutorials,
	},
};

export const WithoutTutorials: Story = {
	args: {
		tags: undefined,

		heading: 'Customers',

		emptyStateCard: {
			heading: 'No Customers Yet',

			description: 'Customers will appear here once subscriptions are created.',
		},
	},
};

export const SimpleEmptyState: Story = {
	args: {
		tags: undefined,

		heading: 'Coupons',

		emptyStateCard: {
			heading: 'No Coupons Available',

			description: 'You have not created any coupons yet.',
		},
	},
};

export const InteractionTest: Story = {
	args: {
		tags: undefined,

		heading: 'Plans',

		addButtonLabel: 'Create Plan',

		onAddClick: () => console.log('Create clicked'),

		emptyStateCard: {
			heading: 'No Plans Found',

			description: 'Create your first pricing plan.',

			buttonLabel: 'Create Plan',

			buttonAction: () => console.log('Create Plan'),
		},
	},

	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const button = canvas.getByText('Create Plan');

		await userEvent.click(button);

		await expect(button).toBeInTheDocument();
	},
};
