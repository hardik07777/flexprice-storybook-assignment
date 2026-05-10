import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import Spinner from './Spinner';

/**
 * Spinner component used for loading states,
 * async operations, and page transitions.
 *
 * Supports:
 * - multiple sizes
 * - inline loading indicators
 * - full-page loading layouts
 */

const meta = {
	title: 'Atoms/Spinner',

	component: Spinner,

	parameters: {
		layout: 'centered',
	},

	tags: ['autodocs'],

	args: {
		size: 24,
	},

	argTypes: {
		size: {
			control: {
				type: 'range',
				min: 12,
				max: 100,
				step: 4,
			},
		},
	},
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

const storyContainer = 'flex items-center justify-center min-h-[180px]';

export const Default: Story = {
	render: (args) => (
		<div className={storyContainer}>
			<Spinner {...args} />
		</div>
	),
};

export const Small: Story = {
	args: {
		size: 16,
	},

	render: (args) => (
		<div className={storyContainer}>
			<Spinner {...args} />
		</div>
	),
};

export const Medium: Story = {
	args: {
		size: 32,
	},

	render: (args) => (
		<div className={storyContainer}>
			<Spinner {...args} />
		</div>
	),
};

export const Large: Story = {
	args: {
		size: 64,
	},

	render: (args) => (
		<div className={storyContainer}>
			<Spinner {...args} />
		</div>
	),
};

export const InlineLoader: Story = {
	render: () => (
		<div className='flex items-center gap-3 text-sm font-medium'>
			<Spinner size={18} />
			Loading billing data...
		</div>
	),
};

export const FullPageLoader: Story = {
	render: () => (
		<div className='flex flex-col items-center justify-center min-h-[300px] gap-4'>
			<Spinner size={48} />

			<div className='text-sm text-muted-foreground'>Fetching analytics...</div>
		</div>
	),
};

export const InteractionTest: Story = {
	render: () => (
		<div className={storyContainer}>
			<Spinner size={32} />

			<span className='ml-3'>Loading...</span>
		</div>
	),

	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		await expect(canvas.getByText('Loading...')).toBeInTheDocument();
	},
};
