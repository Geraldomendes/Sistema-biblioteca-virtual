import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = ComponentProps<'button'>

export function Button(props: ButtonProps) {
  return (
    <button
      className={twMerge(
        'bg-green-600 hover:bg-green-600/90 active:bg-green-600/90 transition-colors rounded px-6 py-2 text-white text-xl font-medium w-full',
        props.className
      )}
      {...props}
    />
  );
}