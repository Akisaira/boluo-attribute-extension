import type { Component, JSXElement } from 'solid-js'

interface SwitchProps {
  children: JSXElement;
  value?: boolean;
  onClick?: () => void;
}

const Switch: Component<SwitchProps> = (props) => {
  return (
    <button
      type="button"
      class={`w-10 h-10 box-border rounded bg-white text-white cursor-pointer flex justify-center items-center ${
        (props.value ?? false)
          ? 'bg-opacity-30 hover:bg-opacity-35'
          : 'bg-opacity-0 hover:bg-opacity-20'
      }`}
      onClick={() => {
        props.onClick?.()
      }}
    >
      <span class="font-bold">{props.children}</span>
    </button>
  )
}

export default Switch
