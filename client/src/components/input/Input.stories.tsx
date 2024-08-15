import type { Meta, StoryObj } from '@storybook/react';
import { Input as InputComponent } from './Input';


const meta: Meta<typeof InputComponent> = {
  title: 'Components/Input',
  component: InputComponent,
  args: {
    placeholder: 'Input',
  },
  argTypes: {
    placeholder: {
      control: 'text',
    },
  },
  render: ({...args}) => <InputComponent {...args} />,
};

export default meta;

type Story = StoryObj<typeof InputComponent>;

export const Input: Story = {};