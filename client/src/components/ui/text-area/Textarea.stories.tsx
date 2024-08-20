import type { Meta, StoryObj } from '@storybook/react';
import { Textarea as TextareaComponent } from './Textarea';

const meta: Meta<typeof TextareaComponent> = {
  title: 'Components/Textarea',
  component: TextareaComponent,
  args: {
    placeholder: 'Textarea',
  },
  argTypes: {
    placeholder: {
      control: 'text',
    },
  },
  render: ({...args}) => <TextareaComponent {...args} />,
};

export default meta;

type Story = StoryObj<typeof TextareaComponent>;

export const Input: Story = {};