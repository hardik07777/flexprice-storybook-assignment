import type { Meta, StoryObj } from '@storybook/react';

import { useMemo, useState } from 'react';

import useFilterStore from './useFilterStore';

type Customer = {
	id: string;
	name: string;
	status: string;
	plan: string;
	revenue: number;
};

const customers: Customer[] = [
	{
		id: 'CUS_001',
		name: 'Acme Inc.',
		status: 'active',
		plan: 'Enterprise',
		revenue: 12000,
	},
	{
		id: 'CUS_002',
		name: 'Nova Labs',
		status: 'trial',
		plan: 'Pro',
		revenue: 4200,
	},
	{
		id: 'CUS_003',
		name: 'PixelWorks',
		status: 'inactive',
		plan: 'Starter',
		revenue: 900,
	},
	{
		id: 'CUS_004',
		name: 'GrowthX',
		status: 'active',
		plan: 'Pro',
		revenue: 7200,
	},
];

const meta = {
	title: 'Advanced/useFilterStore/DataTableDemo',

	parameters: {
		layout: 'fullscreen',
	},
} satisfies Meta;

export default meta;

type Story = StoryObj;

const routeKey = 'customers';

const TableDemo = () => {
	const { setFilter, getFilters, resetFilters } = useFilterStore();

	const [url, setUrl] = useState(window.location.href);

	const updateUrl = () => {
		setUrl(window.location.href);
	};

	const filters = getFilters(routeKey);

	const filteredCustomers = useMemo(() => {
		let result = [...customers];

		if (filters.search) {
			result = result.filter((c) => c.name.toLowerCase().includes(String(filters.search).toLowerCase()));
		}

		if (filters.status) {
			result = result.filter((c) => c.status === filters.status);
		}

		if (filters.sortBy) {
			result.sort((a, b) => {
				const key = filters.sortBy as keyof Customer;

				const direction = filters.sortDirection === 'desc' ? -1 : 1;

				if (a[key] < b[key]) return -1 * direction;

				if (a[key] > b[key]) return 1 * direction;

				return 0;
			});
		}

		return result;
	}, [filters]);

	return (
		<div className='min-h-screen bg-slate-50 p-10'>
			<div className='max-w-6xl mx-auto space-y-6'>
				<div>
					<h1 className='text-3xl font-bold'>Customer DataTable</h1>

					<p className='text-muted-foreground'>Zustand-powered persistent filters with URL fingerprint syncing.</p>
				</div>

				{/* FILTERS */}
				<div className='bg-white rounded-xl border p-5 grid grid-cols-4 gap-4'>
					<div>
						<label className='text-sm font-medium'>Search</label>

						<input
							className='w-full border rounded-md p-2 mt-1'
							placeholder='Search customers...'
							value={String(filters.search || '')}
							onChange={(e) => {
								setFilter(routeKey, 'search', e.target.value);

								updateUrl();
							}}
						/>
					</div>

					<div>
						<label className='text-sm font-medium'>Status</label>

						<select
							className='w-full border rounded-md p-2 mt-1'
							value={String(filters.status || '')}
							onChange={(e) => {
								setFilter(routeKey, 'status', e.target.value);

								updateUrl();
							}}>
							<option value=''>All</option>

							<option value='active'>Active</option>

							<option value='trial'>Trial</option>

							<option value='inactive'>Inactive</option>
						</select>
					</div>

					<div>
						<label className='text-sm font-medium'>Sort By</label>

						<select
							className='w-full border rounded-md p-2 mt-1'
							value={String(filters.sortBy || '')}
							onChange={(e) => {
								setFilter(routeKey, 'sortBy', e.target.value);

								updateUrl();
							}}>
							<option value=''>None</option>

							<option value='name'>Name</option>

							<option value='revenue'>Revenue</option>
						</select>
					</div>

					<div>
						<label className='text-sm font-medium'>Direction</label>

						<select
							className='w-full border rounded-md p-2 mt-1'
							value={String(filters.sortDirection || 'asc')}
							onChange={(e) => {
								setFilter(routeKey, 'sortDirection', e.target.value);

								updateUrl();
							}}>
							<option value='asc'>Ascending</option>

							<option value='desc'>Descending</option>
						</select>
					</div>
				</div>

				{/* ACTIVE FILTERS */}
				<div className='bg-white rounded-xl border p-5'>
					<div className='flex items-center justify-between mb-3'>
						<h2 className='font-semibold'>Active Filters</h2>

						<button
							className='px-4 py-2 border rounded-md'
							onClick={() => {
								resetFilters(routeKey);

								updateUrl();
							}}>
							Reset Filters
						</button>
					</div>

					<pre className='text-xs overflow-auto bg-slate-100 p-3 rounded-md'>{JSON.stringify(filters, null, 2)}</pre>
				</div>

				{/* TABLE */}
				<div className='bg-white rounded-xl border overflow-hidden'>
					<table className='w-full'>
						<thead className='bg-slate-100'>
							<tr>
								<th className='text-left p-4'>Customer</th>

								<th className='text-left p-4'>Status</th>

								<th className='text-left p-4'>Plan</th>

								<th className='text-right p-4'>Revenue</th>
							</tr>
						</thead>

						<tbody>
							{filteredCustomers.map((customer) => (
								<tr key={customer.id} className='border-t'>
									<td className='p-4'>{customer.name}</td>

									<td className='p-4 capitalize'>{customer.status}</td>

									<td className='p-4'>{customer.plan}</td>

									<td className='p-4 text-right'>${customer.revenue.toLocaleString()}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				{/* URL */}
				<div className='bg-white rounded-xl border p-5'>
					<h2 className='font-semibold mb-2'>URL Fingerprint</h2>

					<p className='text-sm text-muted-foreground break-all'>{url}</p>
				</div>
			</div>
		</div>
	);
};

export const Default: Story = {
	render: () => <TableDemo />,
};
