import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import Button from './Button';
import { Plus } from 'lucide-react';

/**
 * Reusable button component supporting multiple variants,
 * loading states, sizes, and icon compositions.
 */

const meta = {
	title: 'Atoms/Button',
	component: Button,

	parameters: {
		layout: 'centered',
	},

	tags: ['autodocs'],

	argTypes: {
		variant: {
			control: 'select',
			options: ['default', 'black', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
		},

		size: {
			control: 'select',
			options: ['default', 'sm', 'lg', 'xs', 'icon'],
		},
	},

	args: {
		children: 'Click Me',
		variant: 'default',
		size: 'default',
	},
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
	args: {
		isLoading: true,
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
	},
};

export const Destructive: Story = {
	args: {
		variant: 'destructive',
		children: 'Delete',
	},
};

export const Outline: Story = {
	args: {
		variant: 'outline',
	},
};

export const WithIcon: Story = {
	args: {
		prefixIcon: <Plus />,
		children: 'Add Item',
	},
};

export const Small: Story = {
	args: {
		size: 'sm',
	},
};

export const Large: Story = {
	args: {
		size: 'lg',
	},
};

export const InteractionTest: Story = {
	args: {
		children: 'Press Me',
	},

	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const button = canvas.getByRole('button');

		await userEvent.click(button);

		await expect(button).toBeInTheDocument();
	},
};
export const AllVariants: Story = {
	render: () => (
		<div className='flex gap-4 flex-wrap'>
			<Button variant='default'>Default</Button>
			<Button variant='black'>Black</Button>
			<Button variant='destructive'>Destructive</Button>
			<Button variant='outline'>Outline</Button>
			<Button variant='secondary'>Secondary</Button>
			<Button variant='ghost'>Ghost</Button>
			<Button variant='link'>Link</Button>
		</div>
	),
};
