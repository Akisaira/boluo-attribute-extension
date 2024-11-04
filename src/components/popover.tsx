import type { Component, JSXElement } from 'solid-js'

interface PopoverProps {
  content: JSXElement;
  children: JSXElement;
}

const Popover: Component<PopoverProps> = (props) => {
  return (
    <div class="group/popover relative inline-block">
      {props.children}
      <div class="size-max invisible group-hover/popover:visible p-2 rounded-[3px] pointer-events-none text-base absolute left-1/2 bottom-[calc(100%+0.25rem)] -translate-x-1/2 bg-black after:content-[''] after:absolute after:block after:-translate-x-1/2 after:size-0 after:top-full after:left-1/2 after:border-8 after:border-solid after:border-x-transparent after:border-b-transparent after:border-t-black">
        {props.content}
      </div>
    </div>
  )
}

export default Popover
