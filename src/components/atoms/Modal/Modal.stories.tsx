import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, userEvent, within } from '@storybook/test';

import Modal from './Modal';
import Button from '../Button/Button';

/**
 * Modal component for dialogs, confirmations,
 * and large interactive content.
 *
 * Supports:
 * - overlay toggling
 * - controlled open state
 * - confirmations
 * - dashboard/modal layouts
 */

const meta = {
	title: 'Atoms/Modal',

	component: Modal,

	parameters: {
		layout: 'centered',
	},

	tags: ['autodocs'],

	args: {
		isOpen: false,
		showOverlay: true,
	},

	argTypes: {
		showOverlay: {
			control: 'boolean',
		},

		isOpen: {
			control: 'boolean',
		},
	},
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

const ModalDemo = ({ showOverlay = true }: { showOverlay?: boolean }) => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<Button onClick={() => setOpen(true)}>Open Modal</Button>

			<Modal isOpen={open} onOpenChange={setOpen} showOverlay={showOverlay}>
				<div className='bg-white rounded-xl p-6 w-[420px] shadow-xl'>
					<h2 className='text-xl font-semibold mb-2'>Upgrade Plan</h2>

					<p className='text-sm text-muted-foreground mb-6'>Unlock advanced analytics and unlimited API access.</p>

					<div className='flex justify-end gap-3'>
						<Button variant='outline' onClick={() => setOpen(false)}>
							Cancel
						</Button>

						<Button onClick={() => setOpen(false)}>Upgrade</Button>
					</div>
				</div>
			</Modal>
		</>
	);
};

export const Default: Story = {
	render: () => <ModalDemo />,
};

export const WithoutOverlay: Story = {
	render: () => <ModalDemo showOverlay={false} />,
};

export const ConfirmationModal: Story = {
	render: () => {
		const [open, setOpen] = useState(false);

		return (
			<>
				<Button variant='destructive' onClick={() => setOpen(true)}>
					Delete Project
				</Button>

				<Modal isOpen={open} onOpenChange={setOpen}>
					<div className='bg-white rounded-xl p-6 w-[400px] shadow-xl'>
						<h2 className='text-lg font-semibold mb-3'>Delete Project</h2>

						<p className='text-sm text-muted-foreground mb-6'>This action cannot be undone.</p>

						<div className='flex justify-end gap-3'>
							<Button variant='outline' onClick={() => setOpen(false)}>
								Cancel
							</Button>

							<Button variant='destructive' onClick={() => setOpen(false)}>
								Delete
							</Button>
						</div>
					</div>
				</Modal>
			</>
		);
	},
};

export const LargeContent: Story = {
	render: () => {
		const [open, setOpen] = useState(false);

		return (
			<>
				<Button onClick={() => setOpen(true)}>Open Large Modal</Button>

				<Modal isOpen={open} onOpenChange={setOpen}>
					<div className='bg-white rounded-xl p-8 w-[700px] shadow-xl space-y-4'>
						<h2 className='text-2xl font-semibold'>Analytics Dashboard</h2>

						<div className='grid grid-cols-2 gap-4'>
							<div className='h-32 rounded-lg bg-gray-100' />
							<div className='h-32 rounded-lg bg-gray-100' />
							<div className='h-32 rounded-lg bg-gray-100' />
							<div className='h-32 rounded-lg bg-gray-100' />
						</div>

						<div className='flex justify-end'>
							<Button onClick={() => setOpen(false)}>Close</Button>
						</div>
					</div>
				</Modal>
			</>
		);
	},
};

export const InteractionTest: Story = {
	render: () => <ModalDemo />,

	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const openButton = canvas.getByText('Open Modal');

		await userEvent.click(openButton);

		await expect(canvas.getByText('Upgrade Plan')).toBeInTheDocument();
	},
};
