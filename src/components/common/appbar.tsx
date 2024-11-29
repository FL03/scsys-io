/*
    Appellation: appbar <module>
    Contrib: @FL03
*/
'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';

const appBarVariants = cva(
  'flex flex-row flex-nowrap space-x-2 w-full items-center justify-items-center justify-between px-4 py-2 z-50 sticky',
  {
    variants: {
      variant: {
        default: 'bg-primary-foreground text-foreground',
        accent: 'bg-accent text-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
      },
      rounded: {
        default: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full',
      },
      size: {
        default: 'h-1/12',
        sm: 'h-12',
        md: 'h-16',
        lg: 'h-20',
      },
      position: {
        top: 'top-0',
        bottom: 'bottom-0',
      },
    },
    defaultVariants: {
      position: 'top',
      rounded: 'default',
      size: 'default',
      variant: 'default',
    },
  }
);

type AppbarContext = {
  centerTitle: boolean;
};

const AppbarContext = React.createContext<AppbarContext>({
  centerTitle: false,
});

// Appbar
const Appbar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> &
    VariantProps<typeof appBarVariants> & { centerTitle?: boolean }
>(({ className, centerTitle, position, size, variant, ...props }, ref) => {
  centerTitle = centerTitle ?? false;

  const contextValue = React.useMemo(() => ({ centerTitle }), [centerTitle]);

  return (
    <AppbarContext.Provider value={contextValue}>
      <div
        ref={ref}
        className={cn(appBarVariants({ position, size, variant }), className)}
        {...props}
      />
    </AppbarContext.Provider>
  );
});
Appbar.displayName = 'Appbar';

// AppbarContent
const AppbarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex flex-row flex-1 flex-nowrap space-x-2 items-center justify-items-center',
      className
    )}
    {...props}
  />
));
AppbarContent.displayName = 'AppbarContent';

// AppbarLeading
const AppbarLeading = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex flex-row flex-shrink flex-nowrap space-x-2 items-center justify-items-center',
      className
    )}
    {...props}
  />
));
AppbarLeading.displayName = 'AppbarLeading';

// AppbarTrailing
const AppbarTrailing = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'ml-auto flex flex-row flex-shrink flex-nowrap space-x-2 items-center justify-items-center justify-end',
      className
    )}
    {...props}
  />
));
AppbarTrailing.displayName = 'AppbarTrailing';

const AppbarLogo = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('h-full w-8 my-auto', className)} {...props} />
));
AppbarLogo.displayName = 'AppbarLogo';

const AppbarTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  const { centerTitle } = React.useContext(AppbarContext);
  return (
    <h1
      ref={ref}
      className={cn(
        'text-lg font-semibold',
        centerTitle && 'absolute left-1/2 transform -translate-x-1/2',
        className
      )}
      {...props}
    />
  );
});
AppbarTitle.displayName = 'AppbarTitle';

const AppbarActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center space-x-2', className)}
    {...props}
  />
));
AppbarActions.displayName = 'AppbarActions';

export {
  Appbar,
  AppbarActions,
  AppbarContent,
  AppbarLeading,
  AppbarLogo,
  AppbarTitle,
  AppbarTrailing,
};
