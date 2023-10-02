import { forwardRef } from "react";

type InputProps = React.ComponentProps<"input"> & { 
  label: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ label, placeholder, error, ...props }, ref) => {
  return (
    <div>
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">{label}</label>
      <input ref={ref} type="text" {...props} className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" placeholder={placeholder} />
      { error ? <span className="text-red-500">{error}</span> : null}
    </div>
  )
})
