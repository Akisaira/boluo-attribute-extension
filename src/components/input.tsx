import type { Component } from 'solid-js'

interface InputProps {
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onInput?: (value: string) => void;
}

const Input: Component<InputProps> = (props) => {
  return (
    <input
      class="bg-[#2d3748] text-[#f7fafc] p-2 text-lg transition-all ease-in duration-100 rounded w-full border border-[#4a5568] hover:border-[#cbd5e0] focus:outline-none focus:border-[#a0aec0]"
      placeholder={props.placeholder}
      type="text"
      value={props.value ?? ''}
      onChange={(e) => {
        props.onChange?.(e.target.value)
      }}
      onInput={(e) => {
        props.onInput?.(e.target.value)
      }}
    />
  )
}

export default Input
