import type { ComponentProps } from "react"

interface InputProps extends ComponentProps<"input"> {
    error?: boolean
}

interface InputRootProps extends ComponentProps<"div"> {
    error?: boolean
}
function InputRoot({ error = false, ...props }: InputRootProps) {
    return (
        <div
            data-error={error}
            className="group bg-gray-800 h-12 border border-gray-600 rounded-xl px-4 flex items-center gap-2 focus-within:border-gray-100 transition-colors duration-200 data-[error=true]:border-danger"
            {...props}
        />
    )
}

interface InputIconProps extends ComponentProps<"span"> {}

function InputIcon(props: InputIconProps) {
    return (
        <span
            className="text-gray-400 group-focus-within:text-gray-100 transition-colors duration-200 group-[&:not(:has(input:placeholder-shown))]:text-gray-100 group-data-[error=true]:text-danger"
            {...props}
        />
    )
}

interface InputFieldProps extends ComponentProps<"input"> {}

function InputField(props: InputFieldProps) {
    return (
        <input className="flex-1 outline-0 placeholder-gray-400" {...props} />
    )
}

export const Input = {
    Root: InputRoot,
    Icon: InputIcon,
    Field: InputField,
}
