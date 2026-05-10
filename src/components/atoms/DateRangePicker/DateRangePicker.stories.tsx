import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, userEvent, within } from '@storybook/test';

import DateRangePicker from './DateRangePicker';

/**
 * DateRangePicker component for selecting
 * start and end dates.
 *
 * Supports:
 * - controlled date ranges
 * - disabled state
 * - min/max selectable dates
 * - dashboard and analytics filtering
 */

const meta = {
	title: 'Atoms/DateRangePicker',

	component: DateRangePicker,

	parameters: {
		layout: 'padded',
	},

	tags: ['autodocs'],

	args: {
		onChange: () => {},
		disabled: false,
	},

	argTypes: {
		disabled: {
			control: 'boolean',
		},

		title: {
			control: 'text',
		},
	},
} satisfies Meta<typeof DateRangePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

const storyContainer = 'min-h-[500px] flex items-start justify-center py-10';

export const Default: Story = {
	render: () => {
		const [dates, setDates] = useState<{
			startDate?: Date;
			endDate?: Date;
		}>({});

		return (
			<div className={storyContainer}>
				<DateRangePicker
					startDate={dates.startDate}
					endDate={dates.endDate}
					onChange={(dates) => setDates(dates)}
					title='Restricted Range'
					minDate={new Date(2026, 4, 10)}
					maxDate={new Date(2026, 4, 20)}
				/>
			</div>
		);
	},
};

export const WithPreselectedDates: Story = {
	render: () => {
		const [dates, setDates] = useState<{
			startDate?: Date;
			endDate?: Date;
		}>({
			startDate: new Date(2026, 4, 1),
			endDate: new Date(2026, 4, 15),
		});

		return (
			<div className={storyContainer}>
				<DateRangePicker
					startDate={dates.startDate}
					endDate={dates.endDate}
					onChange={(dates) => setDates(dates)}
					title='Analytics Range'
				/>
			</div>
		);
	},
};

export const Disabled: Story = {
	render: () => (
		<div className={storyContainer}>
			<DateRangePicker disabled onChange={() => {}} title='Disabled Picker' />
		</div>
	),
};

export const WithMinMaxDates: Story = {
	render: () => {
		const [dates, setDates] = useState<{
			startDate?: Date;
			endDate?: Date;
		}>({});

		return (
			<div className={storyContainer}>
				<DateRangePicker
					startDate={dates.startDate}
					endDate={dates.endDate}
					onChange={(dates) => setDates(dates)}
					title='Restricted Range'
					minDate={new Date(2026, 4, 10)}
					maxDate={new Date(2026, 4, 20)}
				/>
			</div>
		);
	},
};

export const DashboardExample: Story = {
	render: () => {
		const [dates, setDates] = useState<{
			startDate?: Date;
			endDate?: Date;
		}>({});

		return (
			<div className='w-[700px] rounded-xl border p-6 space-y-6'>
				<div className='flex items-center justify-between'>
					<div>
						<h2 className='text-xl font-semibold'>Revenue Analytics</h2>

						<p className='text-sm text-muted-foreground'>Track billing performance and usage trends.</p>
					</div>

					<DateRangePicker startDate={dates.startDate} endDate={dates.endDate} onChange={(dates) => setDates(dates)} />
				</div>

				<div className='grid grid-cols-3 gap-4'>
					<div className='h-32 rounded-lg bg-gray-100' />
					<div className='h-32 rounded-lg bg-gray-100' />
					<div className='h-32 rounded-lg bg-gray-100' />
				</div>
			</div>
		);
	},
};

export const InteractionTest: Story = {
	render: () => {
		const [dates, setDates] = useState<{
			startDate?: Date;
			endDate?: Date;
		}>({});

		return (
			<div className={storyContainer}>
				<DateRangePicker
					startDate={dates.startDate}
					endDate={dates.endDate}
					onChange={(dates) => setDates(dates)}
					title='Select Date Range'
				/>
			</div>
		);
	},

	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const triggerButtons = canvas.getAllByRole('button');

		await userEvent.click(triggerButtons[0]);

		await expect(canvas.getByRole('dialog')).toBeInTheDocument();
	},
};
