import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import { MemoryRouter } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import CommandPalette from './CommandPalette';

/**
 * CommandPalette provides quick keyboard-driven
 * navigation and command execution.
 *
 * Supports:
 * - searchable command actions
 * - keyboard navigation
 * - routing integration
 * - async query-powered actions
 */

const queryClient = new QueryClient();

const meta: Meta<typeof CommandPalette> = {
	title: 'Organisms/CommandPalette',

	component: CommandPalette,

	parameters: {
		layout: 'fullscreen',
	},

	tags: ['autodocs'],

	decorators: [
		(Story) => (
			<QueryClientProvider client={queryClient}>
				<MemoryRouter>
					<div className='min-h-screen p-6'>
						<Story />
					</div>
				</MemoryRouter>
			</QueryClientProvider>
		),
	],

	argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FullScreenView: Story = {
	parameters: {
		layout: 'fullscreen',
	},
};

export const InteractionTest: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		await userEvent.keyboard('{Control>}k{/Control}');

		await expect(canvas.getByRole('dialog')).toBeInTheDocument();
	},
};
