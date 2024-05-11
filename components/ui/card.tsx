import * as React from "react";

import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";

const cardVariants = cva("border bg-card text-card-foreground shadow", {
  variants: {
    size: {
      default: "rounded-xl",
      compact: "rounded",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ size, className }))}
      {...props}
    />
  )
);
Card.displayName = "Card";

const cardHeaderVariants = cva("flex flex-col", {
  variants: {
    size: {
      default: "space-y-1.5 p-6",
      compact: "space-y-1 p-2",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface CardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardHeaderVariants> {}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardHeaderVariants({ size, className }))}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

const cardTitleVariants = cva("font-semibold leading-none tracking-tight", {
  variants: {
    size: {
      default: "text-base",
      compact: "text-sm",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface CardTitleProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardTitleVariants> {}

const CardTitle = React.forwardRef<HTMLParagraphElement, CardTitleProps>(
  ({ className, size, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(cardTitleVariants({ size, className }))}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

const cardDescriptionVariants = cva("text-muted-foreground", {
  variants: {
    size: {
      default: "text-sm",
      compact: "text-xs",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardDescriptionVariants> {}

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ className, size, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(cardDescriptionVariants({ size, className }))}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const cardContentVariants = cva("pt-0", {
  variants: {
    size: {
      default: "p-6",
      compact: "p-2",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface CardContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardContentVariants> {}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardContentVariants({ size, className }))}
      {...props}
    />
  )
);
CardContent.displayName = "CardContent";

const cardFooterVariants = cva("flex items-center pt-0", {
  variants: {
    size: {
      default: "p-6",
      compact: "p-2",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface CardFooterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardFooterVariants> {}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardFooterVariants({ size, className }))}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
