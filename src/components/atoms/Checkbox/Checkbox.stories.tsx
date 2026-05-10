import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, userEvent, within } from '@storybook/test';

import Checkbox from './Checkbox';

/**
 * Checkbox component for boolean selections.
 *
 * Supports:
 * - controlled checked state
 * - labels and descriptions
 * - accessibility-friendly interactions
 * - settings/preferences style layouts
 */

const meta = {
	title: 'Atoms/Checkbox',

	component: Checkbox,

	parameters: {
		layout: 'centered',
	},

	tags: ['autodocs'],

	args: {
		label: 'Accept terms and conditions',
		disabled: false,
	},

	argTypes: {
		checked: {
			control: 'boolean',
		},

		disabled: {
			control: 'boolean',
		},

		label: {
			control: 'text',
		},

		description: {
			control: 'text',
		},
	},
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

const storyContainer = 'w-[420px] py-10 flex items-center';

export const Default: Story = {
	render: () => {
		const [checked, setChecked] = useState(false);

		return (
			<div className={storyContainer}>
				<Checkbox checked={checked} onCheckedChange={setChecked} label='Accept terms and conditions' />
			</div>
		);
	},
};

export const Checked: Story = {
	render: () => (
		<div className={storyContainer}>
			<Checkbox checked label='Email notifications enabled' />
		</div>
	),
};

export const WithDescription: Story = {
	render: () => {
		const [checked, setChecked] = useState(true);

		return (
			<div className={storyContainer}>
				<Checkbox
					checked={checked}
					onCheckedChange={setChecked}
					label='Enable analytics'
					description='Collect anonymous usage data to improve platform performance.'
				/>
			</div>
		);
	},
};

export const LongLabel: Story = {
	render: () => {
		const [checked, setChecked] = useState(false);

		return (
			<div className={storyContainer}>
				<Checkbox
					checked={checked}
					onCheckedChange={setChecked}
					label='I agree to the platform billing terms, privacy policy, and data retention agreement.'
				/>
			</div>
		);
	},
};

export const SettingsExample: Story = {
	render: () => {
		const [email, setEmail] = useState(true);

		const [sms, setSms] = useState(false);

		const [reports, setReports] = useState(true);

		return (
			<div className='w-[500px] rounded-xl border p-6 space-y-5'>
				<h3 className='text-lg font-semibold'>Notification Preferences</h3>

				<Checkbox
					checked={email}
					onCheckedChange={setEmail}
					label='Email notifications'
					description='Receive updates about billing and invoices.'
				/>

				<Checkbox checked={sms} onCheckedChange={setSms} label='SMS alerts' description='Get urgent alerts via SMS.' />

				<Checkbox checked={reports} onCheckedChange={setReports} label='Weekly reports' description='Receive weekly analytics summaries.' />
			</div>
		);
	},
};

export const InteractionTest: Story = {
	render: () => {
		const [checked, setChecked] = useState(false);

		return (
			<div className={storyContainer}>
				<Checkbox checked={checked} onCheckedChange={setChecked} label='Enable notifications' />
			</div>
		);
	},

	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const checkbox = canvas.getByRole('checkbox');

		await userEvent.click(checkbox);

		await expect(checkbox).toBeChecked();
	},
};
