import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import Tooltip from './Tooltip';
import Button from '../Button/Button';

/**
 * Tooltip component for contextual hints,
 * explanations, and supplementary UI information.
 *
 * Supports:
 * - multiple tooltip positions
 * - delayed appearance
 * - custom content
 * - interactive hover states
 */

const meta = {
	title: 'Atoms/Tooltip',

	component: Tooltip,

	parameters: {
		layout: 'centered',
	},

	tags: ['autodocs'],

	args: {
		children: <Button>Hover Me</Button>,
		content: 'Tooltip content',
	},

	argTypes: {
		side: {
			control: 'select',
			options: ['top', 'bottom', 'left', 'right'],
		},

		delayDuration: {
			control: {
				type: 'range',
				min: 0,
				max: 3000,
				step: 100,
			},
		},

		content: {
			control: 'text',
		},
	},
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Tooltip content='This is a tooltip'>
			<Button>Hover Me</Button>
		</Tooltip>
	),
};

export const Top: Story = {
	render: () => (
		<Tooltip content='Tooltip on top' side='top'>
			<Button>Top</Button>
		</Tooltip>
	),
};

export const Bottom: Story = {
	render: () => (
		<Tooltip content='Tooltip on bottom' side='bottom'>
			<Button>Bottom</Button>
		</Tooltip>
	),
};

export const Left: Story = {
	render: () => (
		<Tooltip content='Tooltip on left' side='left'>
			<Button>Left</Button>
		</Tooltip>
	),
};

export const Right: Story = {
	render: () => (
		<Tooltip content='Tooltip on right' side='right'>
			<Button>Right</Button>
		</Tooltip>
	),
};

export const Delayed: Story = {
	render: () => (
		<Tooltip content='Appears after delay' delayDuration={1000}>
			<Button>Delayed Tooltip</Button>
		</Tooltip>
	),
};

export const CustomContent: Story = {
	render: () => (
		<div className='flex items-center justify-center min-h-[120px] px-10'>
			<Tooltip
				content={
					<div className='space-y-1'>
						<p className='font-medium'>Pro Plan</p>

						<p className='text-xs opacity-80'>Includes unlimited usage and analytics.</p>
					</div>
				}>
				<Button>Pricing Info</Button>
			</Tooltip>
		</div>
	),
};

export const AllPositions: Story = {
	render: () => (
		<div className='flex w-[700px] py-16 px-5 items-center justify-between'>
			<Tooltip content='Top Tooltip' side='top'>
				<Button>Top</Button>
			</Tooltip>

			<Tooltip content='Bottom Tooltip' side='bottom'>
				<Button>Bottom</Button>
			</Tooltip>

			<Tooltip content='Left Tooltip' side='left'>
				<Button>Left</Button>
			</Tooltip>

			<Tooltip content='Right Tooltip' side='right'>
				<Button>Right</Button>
			</Tooltip>
		</div>
	),
};

export const InteractionTest: Story = {
	render: () => (
		<Tooltip content='Tooltip opened'>
			<Button>Hover Trigger</Button>
		</Tooltip>
	),

	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const trigger = canvas.getByText('Hover Trigger');

		await userEvent.hover(trigger);

		await expect(await canvas.findByText('Tooltip opened')).toBeInTheDocument();
	},
};
