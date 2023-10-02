import { forwardRef } from "react";

type ButtonIconProps = {
  as?: React.ElementType | keyof JSX.IntrinsicElements
} & React.ComponentProps<any>

export const ButtonIcon = forwardRef<HTMLButtonElement, ButtonIconProps>(({ children, as = "button", ...props }, ref) => {
  const Component = as

  return  (
    <Component ref={ref} type="button" {...props}>
      {children}
    </Component>
  )     
})
