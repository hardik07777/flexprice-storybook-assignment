import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Select, SearchableSelect, AsyncSearchableSelect, AsyncMultiSearchableSelect } from './index';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

/**
 * Flexible select components supporting:
 * standard select,
 * searchable select,
 * async search,
 * and multi-select behavior.
 */

const options = [
	{ value: 'starter', label: 'Starter Plan' },
	{ value: 'pro', label: 'Pro Plan' },
	{ value: 'enterprise', label: 'Enterprise Plan' },
];

const queryClient = new QueryClient();

const storyContainer = 'w-[320px] py-6';

const meta = {
	title: 'Atoms/Select',
	component: Select,

	parameters: {
		layout: 'padded',
	},

	tags: ['autodocs'],

	args: {
		options,
	},
	argTypes: {
		disabled: {
			control: 'boolean',
		},

		placeholder: {
			control: 'text',
		},

		label: {
			control: 'text',
		},
	},
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => {
		const [value, setValue] = useState('');

		return (
			<div className={storyContainer}>
				<Select options={options} value={value} onChange={setValue} placeholder='Choose a plan' label='Pricing Plan' />
			</div>
		);
	},
};

export const Disabled: Story = {
	render: () => (
		<div className={storyContainer}>
			<Select disabled options={options} placeholder='Disabled Select' />
		</div>
	),
};

export const WithError: Story = {
	render: () => {
		const [value, setValue] = useState('pro');

		return (
			<div className={storyContainer}>
				<Select options={options} value={value} onChange={setValue} label='Plan' error='Please select a plan' />
			</div>
		);
	},
};

export const Searchable: Story = {
	render: () => {
		const [value, setValue] = useState('');

		return (
			<div className={storyContainer}>
				<SearchableSelect
					options={options}
					value={value}
					onChange={setValue}
					label='Search Plans'
					// FIX: default side was 'top' which caused the dropdown to overlap
					// the error/description text rendered below the trigger.
					// Explicitly set to 'bottom' so the popover always opens downward.
					side='bottom'
				/>
			</div>
		);
	},
};

export const SearchableWithError: Story = {
	render: () => {
		const [value, setValue] = useState('');

		return (
			<div className={storyContainer}>
				<SearchableSelect
					options={options}
					value={value}
					onChange={setValue}
					label='Search Plans'
					error='Please select a plan'
					side='bottom'
				/>
			</div>
		);
	},
};

export const AsyncSearch: Story = {
	render: () => {
		const [value, setValue] = useState<any>();

		return (
			<QueryClientProvider client={queryClient}>
				<div className={storyContainer}>
					<AsyncSearchableSelect
						value={value}
						onChange={setValue}
						extractors={{
							valueExtractor: (item) => item.value,
							labelExtractor: (item) => item.label,
						}}
						search={{
							searchFn: async (query) => {
								await new Promise((resolve) => setTimeout(resolve, 500));

								return options
									.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()))
									.map((item) => ({
										...item,
										data: item,
									}));
							},
						}}
						display={{
							label: 'Async Search',
							// FIX: explicitly open downward so the popover never overlaps
							// the description/error text rendered below the trigger.
							side: 'bottom',
						}}
					/>
				</div>
			</QueryClientProvider>
		);
	},
};

export const AsyncSearchWithError: Story = {
	render: () => {
		const [value, setValue] = useState<any>();

		return (
			<QueryClientProvider client={queryClient}>
				<div className={storyContainer}>
					<AsyncSearchableSelect
						value={value}
						onChange={setValue}
						extractors={{
							valueExtractor: (item) => item.value,
							labelExtractor: (item) => item.label,
						}}
						search={{
							searchFn: async (query) => {
								await new Promise((resolve) => setTimeout(resolve, 500));

								return options
									.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()))
									.map((item) => ({
										...item,
										data: item,
									}));
							},
						}}
						display={{
							label: 'Async Search',
							error: 'Please select a plan',
							side: 'bottom',
						}}
					/>
				</div>
			</QueryClientProvider>
		);
	},
};

export const MultiSelect: Story = {
	render: () => {
		const [value, setValue] = useState<any[]>([]);

		return (
			<QueryClientProvider client={queryClient}>
				<div className={storyContainer}>
					<AsyncMultiSearchableSelect
						value={value}
						onChange={setValue}
						extractors={{
							valueExtractor: (item) => item.value,
							labelExtractor: (item) => item.label,
						}}
						search={{
							searchFn: async (query) => {
								await new Promise((resolve) => setTimeout(resolve, 500));

								return options
									.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()))
									.map((item) => ({
										...item,
										data: item,
									}));
							},
						}}
						display={{
							label: 'Multi Select',
							// FIX: explicitly open downward so the popover never overlaps
							// the description/error text rendered below the trigger.
							side: 'bottom',
						}}
					/>
				</div>
			</QueryClientProvider>
		);
	},
};

export const MultiSelectWithError: Story = {
	render: () => {
		const [value, setValue] = useState<any[]>([]);

		return (
			<QueryClientProvider client={queryClient}>
				<div className={storyContainer}>
					<AsyncMultiSearchableSelect
						value={value}
						onChange={setValue}
						extractors={{
							valueExtractor: (item) => item.value,
							labelExtractor: (item) => item.label,
						}}
						search={{
							searchFn: async (query) => {
								await new Promise((resolve) => setTimeout(resolve, 500));

								return options
									.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()))
									.map((item) => ({
										...item,
										data: item,
									}));
							},
						}}
						display={{
							label: 'Multi Select',
							error: 'Please select at least one plan',
							side: 'bottom',
						}}
					/>
				</div>
			</QueryClientProvider>
		);
	},
};
import { expect, userEvent, within } from '@storybook/test';

export const InteractionTest: Story = {
	render: () => {
		const [value, setValue] = useState('');

		return (
			<div className={storyContainer}>
				<Select options={options} value={value} onChange={setValue} placeholder='Choose a plan' label='Pricing Plan' />
			</div>
		);
	},

	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const trigger = canvas.getByRole('combobox');

		await userEvent.click(trigger);

		const option = await canvas.findByText('Pro Plan');

		await userEvent.click(option);

		await expect(canvas.getByText('Pro Plan')).toBeInTheDocument();
	},
};
