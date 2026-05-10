import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { userEvent, within, expect } from '@storybook/test';

import EventFilter, { EventFilterData } from './EventFilter';

const meta = {
	title: 'Molecules/EventFilter',

	component: EventFilter,

	parameters: {
		layout: 'centered',
	},

	args: {
		orientation: 'horizontal',
		disabled: false,
	},

	argTypes: {
		orientation: {
			control: 'radio',
			options: ['horizontal', 'vertical'],
		},

		disabled: {
			control: 'boolean',
		},

		error: {
			control: 'text',
		},
	},
} satisfies Meta<typeof EventFilter>;

export default meta;

type Story = StoryObj<typeof meta>;

const EventFilterWrapper = (args: any) => {
	const [eventFilters, setEventFilters] = useState<EventFilterData[]>([
		{
			key: 'event_type',
			values: ['payment_success'],
		},
	]);

	return (
		<div className='w-[700px]'>
			<EventFilter {...args} eventFilters={eventFilters} setEventFilters={setEventFilters} />
		</div>
	);
};

export const Default: Story = {
	render: (args) => <EventFilterWrapper {...args} />,
};

export const VerticalLayout: Story = {
	render: (args) => <EventFilterWrapper {...args} />,

	args: {
		orientation: 'vertical',
	},
};

export const Disabled: Story = {
	render: (args) => <EventFilterWrapper {...args} />,

	args: {
		disabled: true,
	},
};

export const WithError: Story = {
	render: (args) => <EventFilterWrapper {...args} />,

	args: {
		error: 'At least one event filter is required.',
	},
};

export const MultipleFilters: Story = {
	render: (args) => {
		const [eventFilters, setEventFilters] = useState<EventFilterData[]>([
			{
				key: 'event_type',
				values: ['payment_success'],
			},
			{
				key: 'region',
				values: ['us-east', 'india'],
			},
		]);

		return (
			<div className='w-[700px]'>
				<EventFilter {...args} eventFilters={eventFilters} setEventFilters={setEventFilters} />
			</div>
		);
	},
};

export const Interactive: Story = {
	render: (args) => <EventFilterWrapper {...args} />,

	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const addButton = canvas.getByText('Event Filter');

		await userEvent.click(addButton);

		await expect(canvas.getAllByPlaceholderText('key').length).toBeGreaterThan(1);
	},
};
