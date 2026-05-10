import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, expect, fn } from '@storybook/test';

import FlexpriceTable, { ColumnData } from './Table';

type Customer = {
	id: string;
	name: string;
	email: string;
	plan: string;
	revenue: string;
	status: string;
};

const data: Customer[] = [
	{
		id: 'CUS_001',
		name: 'Acme Inc.',
		email: 'billing@acme.com',
		plan: 'Enterprise',
		revenue: '$12,400',
		status: 'Active',
	},
	{
		id: 'CUS_002',
		name: 'Nova Labs',
		email: 'finance@nova.io',
		plan: 'Pro',
		revenue: '$4,200',
		status: 'Trial',
	},
	{
		id: 'CUS_003',
		name: 'PixelWorks',
		email: 'team@pixel.dev',
		plan: 'Starter',
		revenue: '$899',
		status: 'Inactive',
	},
];

const columns: ColumnData<Customer>[] = [
	{
		title: 'Customer',
		fieldName: 'name',
		fieldVariant: 'title',
	},
	{
		title: 'Email',
		fieldName: 'email',
	},
	{
		title: 'Plan',
		fieldName: 'plan',
		align: 'center',
	},
	{
		title: 'Revenue',
		fieldName: 'revenue',
		align: 'right',
	},
	{
		title: 'Status',
		render: (row) => (
			<span
				className={`px-2 py-1 rounded-full text-xs font-medium ${
					row.status === 'Active'
						? 'bg-green-100 text-green-700'
						: row.status === 'Trial'
							? 'bg-yellow-100 text-yellow-700'
							: 'bg-gray-100 text-gray-600'
				}`}>
				{row.status}
			</span>
		),
		align: 'center',
	},
];

const meta = {
	title: 'Molecules/Table',

	component: FlexpriceTable,

	parameters: {
		layout: 'padded',
	},

	tags: ['autodocs'],

	args: {
		columns,
		data,
		showEmptyRow: false,
	},

	argTypes: {
		variant: {
			control: 'radio',
			options: ['default', 'no-bordered'],
		},

		showEmptyRow: {
			control: 'boolean',
		},
	},
} satisfies Meta<typeof FlexpriceTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => (
		<div className='w-full max-w-5xl'>
			<FlexpriceTable {...args} />
		</div>
	),
};

export const EmptyState: Story = {
	render: (args) => (
		<div className='w-full max-w-5xl'>
			<FlexpriceTable {...args} data={[]} showEmptyRow />
		</div>
	),
};

export const ClickableRows: Story = {
	args: {
		onRowClick: fn(),
	},

	render: (args) => (
		<div className='w-full max-w-5xl'>
			<FlexpriceTable {...args} />
		</div>
	),

	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);

		const row = canvas.getByText('Acme Inc.');

		await userEvent.click(row);

		await expect(args.onRowClick).toHaveBeenCalled();
	},
};

export const BorderlessVariant: Story = {
	args: {
		variant: 'no-bordered',
	},

	render: (args) => (
		<div className='w-full max-w-5xl'>
			<FlexpriceTable {...args} />
		</div>
	),
};

export const DashboardExample: Story = {
	render: (args) => (
		<div className='space-y-6 w-full max-w-6xl'>
			<div>
				<h2 className='text-2xl font-semibold'>Customer Billing Overview</h2>

				<p className='text-muted-foreground text-sm'>Monitor subscriptions, revenue, and customer activity.</p>
			</div>

			<FlexpriceTable {...args} />
		</div>
	),
};
