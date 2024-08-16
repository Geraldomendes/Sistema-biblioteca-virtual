import { ComponentProps, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends ComponentProps<'input'> {
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ error, ...props }, ref) => (
  <div>
    <input ref={ref} className={twMerge('border-gray-400 border p-2 rounded w-full', props.className)} {...props} />
    {error && <span className="text-red-500">{error}</span>}
  </div>
));

export { Input };
