import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import Input from './Input';

/**
 * Reusable input component supporting:
 * - labels
 * - validation errors
 * - disabled states
 * - controlled values
 * - full width layouts
 */

const meta = {
	title: 'Atoms/Input',

	component: Input,

	parameters: {
		layout: 'centered',
	},

	tags: ['autodocs'],

	args: {
		placeholder: 'Enter text here',
		disabled: false,
		fullWidth: false,
	},

	argTypes: {
		type: {
			control: 'select',
			options: ['text', 'email', 'password', 'number'],
		},

		disabled: {
			control: 'boolean',
		},

		fullWidth: {
			control: 'boolean',
		},

		label: {
			control: 'text',
		},

		placeholder: {
			control: 'text',
		},

		error: {
			control: 'text',
		},
	},
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
	args: {
		label: 'Email',
		placeholder: 'Enter your email',
		type: 'email',
	},
};

export const WithError: Story = {
	args: {
		label: 'Password',
		type: 'password',
		error: 'Password must be at least 8 characters',
		placeholder: 'Enter your password',
	},
};

export const Disabled: Story = {
	args: {
		label: 'Username',
		placeholder: 'Enter your username',
		disabled: true,
	},
};

export const FullWidth: Story = {
	args: {
		label: 'Full Name',
		placeholder: 'Enter your full name',
		fullWidth: true,
	},

	parameters: {
		layout: 'padded',
	},
};

export const WithValue: Story = {
	args: {
		label: 'Name',
		value: 'John Doe',
		placeholder: 'Enter your name',
	},
};

export const InteractionTest: Story = {
	args: {
		label: 'Email',
		placeholder: 'Enter email',
	},

	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const input = canvas.getByPlaceholderText('Enter email');

		await userEvent.type(input, 'test@example.com');

		await expect(input).toHaveValue('test@example.com');
	},
};
