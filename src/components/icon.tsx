import type { Component, JSXElement } from 'solid-js'

interface IconProps {
  children: JSXElement;
  size?: number;
}

const Icon: Component<IconProps> = (props) => {
  return (
    <i
      class="block text-[--bae-icon-size] size-[--bae-icon-size]"
      style={{
        '--bae-icon-size': `${props.size ?? 18}px`
      }}
    >
      {props.children}
    </i>
  )
}

export default Icon
export type { IconProps }
