import type { Meta, StoryObj } from '@storybook/react';
import { Button as ButtonComponent, ButtonProps } from './Button';

const variantOptions: ButtonProps['variant'][] = ['text', 'contained'];
const sizeOptions: ButtonProps['size'][] = ['md', 'xs'];

const meta: Meta<typeof ButtonComponent> = {
  title: 'Components/Button',
  component: ButtonComponent,
  args: {
    children: 'Button',
    variant: 'text',
    size: 'md',
  },
  argTypes: {
    children: {
      control: 'text',
    },
    variant: {
      control: 'select',
      options: variantOptions,
    },
    size: {
      control: 'select',
      options: sizeOptions,
    }
  },
  render: ({children, ...args}) => <ButtonComponent {...args}>{children}</ButtonComponent>,
};

export default meta;

type Story = StoryObj<typeof ButtonComponent>;

export const Button: Story = {};

export const ContainedButton: Story = {
  args: {
    children: "Button",
    variant: "contained",
    size: "md"
  }
};

export const TextButton: Story = {
  args: {
    children: "Button",
    variant: "text",
    size: "md"
  }
};