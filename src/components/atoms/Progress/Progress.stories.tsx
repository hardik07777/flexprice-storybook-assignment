import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import Progress from './Progress';

/**
 * Progress component for visualizing
 * task completion and usage metrics.
 *
 * Supports:
 * - percentage progress
 * - labels
 * - custom colors
 * - dashboard usage layouts
 */

const meta = {
	title: 'Atoms/Progress',

	component: Progress,

	parameters: {
		layout: 'padded',
	},

	tags: ['autodocs'],

	args: {
		value: 60,
	},

	argTypes: {
		value: {
			control: {
				type: 'range',
				min: 0,
				max: 100,
				step: 1,
			},
		},

		label: {
			control: 'text',
		},

		indicatorColor: {
			control: 'text',
		},

		backgroundColor: {
			control: 'text',
		},

		labelColor: {
			control: 'text',
		},
	},
} satisfies Meta<typeof Progress>;

export default meta;

type Story = StoryObj<typeof meta>;

const storyContainer = 'w-[500px] py-8';

export const Default: Story = {
	render: (args) => (
		<div className={storyContainer}>
			<Progress {...args} />
		</div>
	),
};

export const WithLabel: Story = {
	render: () => (
		<div className={storyContainer}>
			<Progress value={72} label='72% usage completed' />
		</div>
	),
};

export const LowProgress: Story = {
	render: () => (
		<div className={storyContainer}>
			<Progress value={20} label='20% completed' />
		</div>
	),
};

export const Completed: Story = {
	render: () => (
		<div className={storyContainer}>
			<Progress value={100} label='Completed' />
		</div>
	),
};

export const CustomColors: Story = {
	render: () => (
		<div className={storyContainer}>
			<Progress value={80} label='Billing usage' indicatorColor='bg-green-500' backgroundColor='bg-green-100' labelColor='text-green-700' />
		</div>
	),
};

export const UsageExample: Story = {
	render: () => (
		<div className='w-[500px] rounded-lg border p-6 space-y-4'>
			<div className='flex items-center justify-between'>
				<span className='text-sm font-medium'>API Usage</span>

				<span className='text-sm text-muted-foreground'>8,200 / 10,000 requests</span>
			</div>

			<Progress value={82} indicatorColor='bg-blue-600' backgroundColor='bg-blue-100' />

			<p className='text-xs text-muted-foreground'>You are approaching your monthly quota.</p>
		</div>
	),
};

export const MultiProgressBars: Story = {
	render: () => (
		<div className='w-[500px] space-y-6'>
			<Progress value={25} label='Storage' />

			<Progress value={50} label='Bandwidth' />

			<Progress value={85} label='API Usage' />
		</div>
	),
};

export const InteractionTest: Story = {
	render: () => (
		<div className={storyContainer}>
			<Progress value={75} label='Progress Test' />
		</div>
	),

	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		await expect(canvas.getByText('Progress Test')).toBeInTheDocument();
	},
};
