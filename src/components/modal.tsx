import type { JSXElement, Component } from 'solid-js'

import { Show } from 'solid-js'
import { Portal } from 'solid-js/web'

import { CloseCross } from '@/icon-set'
import { useModalZIndex } from '@/store'

import Button from './button'

interface ModalProps {
  title: string;
  shown: boolean;
  onClose: () => void;
  children: JSXElement;
}

const Modal: Component<ModalProps> = (props) => {
  const zIndex = useModalZIndex()
  return (
    <Portal>
      <Show when={props.shown}>
        <div
          class="fixed top-0 left-0 bg-black/50 size-full flex items-center justify-center z-[--bae-modal-z-index]"
          style={{
            '--bae-modal-z-index': zIndex
          }}
          onClick={() => {
            props.onClose()
          }}
        >
          <div
            class="flex flex-col max-h-[80vh] slim-webkit-scroll md:min-w-96 rounded-md bg-[#232b3a] text-white shadow-[0_0_0_8px_#64646466]"
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <div class="flex w-full py-3 px-4 round">
              <div class="text-[#a0aec0] text-xl flex-1">{props.title}</div>
              <Button round icon={<CloseCross />} onClick={props.onClose} />
            </div>
            <div class="p-4">{props.children}</div>
          </div>
        </div>
      </Show>
    </Portal>
  )
}

export default Modal
