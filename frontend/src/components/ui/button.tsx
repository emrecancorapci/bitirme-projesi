import { Slot } from '@radix-ui/react-slot';
import { type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

import buttonVariants from './button.variants';

export interface ButtonProperties
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function ButtonComponent(
  { className, variant, size, asChild = false, ...properties }: ButtonProperties,
  reference: React.ForwardedRef<HTMLButtonElement>,
) {
  const Comp = asChild ? Slot : 'button';
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={reference} {...properties} />;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProperties>(ButtonComponent);
Button.displayName = 'Button';

export default Button;
