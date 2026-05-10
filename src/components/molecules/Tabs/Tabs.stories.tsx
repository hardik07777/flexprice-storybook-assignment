import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { userEvent, within, expect } from '@storybook/test';

import CustomTabs from './CustomTabs';
import FlatTabs from './FlatTabs';

const sampleTabs = [
	{
		value: 'overview',
		label: 'Overview',
		content: <div className='rounded-md border p-4'>Overview Content</div>,
	},
	{
		value: 'analytics',
		label: 'Analytics',
		content: <div className='rounded-md border p-4'>Analytics Content</div>,
	},
	{
		value: 'settings',
		label: 'Settings',
		content: <div className='rounded-md border p-4'>Settings Content</div>,
	},
];

const meta: Meta<typeof CustomTabs> = {
	title: 'Molecules/Tabs',

	component: CustomTabs,

	parameters: {
		layout: 'centered',
	},

	decorators: [
		(Story) => (
			<MemoryRouter>
				<div className='w-[600px] p-4'>
					<Story />
				</div>
			</MemoryRouter>
		),
	],

	args: {
		tabs: sampleTabs,
		defaultValue: 'overview',
	},

	argTypes: {
		defaultValue: {
			control: 'select',
			options: ['overview', 'analytics', 'settings'],
		},
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DefaultTabSelected: Story = {
	args: {
		defaultValue: 'analytics',
	},
};

export const FlatVariant: Story = {
	render: () => (
		<div className='w-[600px]'>
			<FlatTabs tabs={sampleTabs} />
		</div>
	),
};

export const Interactive: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const analyticsTab = canvas.getByText('Analytics');

		await userEvent.click(analyticsTab);

		await expect(canvas.getByText('Analytics Content')).toBeInTheDocument();
	},
};
