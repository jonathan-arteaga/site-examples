import { cn } from '../lib/utils';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'flex w-full rounded-lg border border-input bg-transparent px-4 py-2.5 text-base shadow-sm transition-colors resize-y min-h-[100px]',
        'placeholder:text-muted-foreground',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/20 focus-visible:border-ring',
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        'aria-invalid:border-destructive aria-invalid:ring-destructive/20',
        'md:text-sm',
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
