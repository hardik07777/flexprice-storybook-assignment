import type { Meta, StoryObj } from '@storybook/react';

import { QUERY_CONFIG_PRESETS, createQueryConfig } from './queryConfig';

const meta = {
	title: 'Advanced/QueryConfig',

	parameters: {
		layout: 'centered',
	},
} satisfies Meta;

export default meta;

type Story = StoryObj;

const ConfigCard = ({ title, config }: { title: string; config: object }) => (
	<div className='rounded-xl border bg-white p-5 space-y-3'>
		<h2 className='text-lg font-semibold'>{title}</h2>

		<pre className='bg-slate-100 p-3 rounded-md text-sm overflow-auto'>{JSON.stringify(config, null, 2)}</pre>
	</div>
);

const QueryConfigDemo = () => {
	const realtimeConfig = createQueryConfig(QUERY_CONFIG_PRESETS.REALTIME);

	const defaultConfig = createQueryConfig();

	const staticConfig = createQueryConfig(QUERY_CONFIG_PRESETS.STATIC);

	const customInvoicesConfig = createQueryConfig({
		staleTime: 0,
		gcTime: 2 * 60 * 1000,
	});

	return (
		<div className='min-h-screen bg-slate-50 p-10'>
			<div className='max-w-5xl mx-auto space-y-6'>
				<div>
					<h1 className='text-3xl font-bold'>Query Config Utility</h1>

					<p className='text-muted-foreground'>Centralized TanStack Query caching configuration system.</p>
				</div>

				<div className='grid grid-cols-2 gap-5'>
					<ConfigCard title='REALTIME' config={realtimeConfig} />

					<ConfigCard title='DEFAULT' config={defaultConfig} />

					<ConfigCard title='STATIC' config={staticConfig} />

					<ConfigCard title='Invoices Override' config={customInvoicesConfig} />
				</div>

				<div className='rounded-xl border bg-white p-5'>
					<h2 className='text-lg font-semibold mb-3'>Example Usage</h2>

					<pre className='bg-slate-100 p-4 rounded-md text-sm overflow-auto'>
						{`const invoicesQuery = useQuery({
  queryKey: ['invoices'],
  queryFn: fetchInvoices,
  ...createQueryConfig(
    QUERY_CONFIG_PRESETS.REALTIME
  ),
});

const plansQuery = useQuery({
  queryKey: ['plans'],
  queryFn: fetchPlans,
  ...createQueryConfig(
    QUERY_CONFIG_PRESETS.STATIC
  ),
});`}
					</pre>
				</div>
			</div>
		</div>
	);
};

export const Default: Story = {
	render: () => <QueryConfigDemo />,
};
