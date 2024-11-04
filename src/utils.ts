/* eslint-disable @typescript-eslint/unbound-method */
import type { Accessor, Setter } from 'solid-js'

import { createEffect, createMemo, createSignal, on } from 'solid-js'

import type { Character } from './store'

export function setEqual<T> (a: Set<T>, b: Set<T>): boolean {
  if (a.size !== b.size) return false
  for (const item of a) {
    if (!b.has(item)) return false
  }
  return true
}

export function setSubtract<T> (a: Set<T>, b: Set<T>): Set<T> {
  const result = new Set<T>()
  for (const item of a) {
    if (!b.has(item)) result.add(item)
  }
  return result
}

export function setUnion<T> (a: Set<T>, b: Set<T>): Set<T> {
  const result = new Set<T>()
  for (const item of a) result.add(item)
  for (const item of b) result.add(item)
  return result
}

export interface DialogWindow {
  bottomBar: HTMLDivElement;
  dialog: HTMLDivElement;
  topBar: HTMLDivElement;
  inputArea: HTMLTextAreaElement;
  sendButton: HTMLButtonElement;
  inputContent: Accessor<string>;
  setInputContent: Setter<string>;
  openIDModal: () => Promise<IDModal>;
  setID: (id: string) => Promise<void>;
}

interface IDModal {
  closeButton: HTMLButtonElement;
  idInput: HTMLInputElement;
  submitButton: HTMLButtonElement;
}

function simulateNativeInput (
  el: HTMLInputElement | HTMLTextAreaElement,
  value: string
): void {
  const nativeInputValueSetter =
    el instanceof HTMLInputElement
      ? Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!
        .set!
      : Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value')!
        .set!
  nativeInputValueSetter.call(el, value)
  el.dispatchEvent(new Event('input', { bubbles: true }))
}

const [inputContent, setInputContent] = createSignal<string>('')

export function useDialogWindow (
  appRoot: Accessor<HTMLDivElement | undefined>
): () => DialogWindow | undefined {
  const memo = createMemo(() => {
    const root = appRoot()
    if (!(root?.isConnected ?? false)) {
      return undefined
    }
    const bottomBar = root!.parentElement!.parentElement! as HTMLDivElement
    const dialog = bottomBar.previousElementSibling! as HTMLDivElement
    const topBar = dialog.previousElementSibling! as HTMLDivElement
    const inputArea =
      bottomBar.querySelector<HTMLTextAreaElement>('.css-o3nsyu')!
    const sendButton = bottomBar.querySelector<HTMLButtonElement>(
      '.css-ks2ywa:has(svg[sprite="/2495daf7694b94d633e1e9925cf85201.svg#paper-plane-usage"])'
    )!

    const openIDModal = async (): Promise<IDModal> => {
      return await new Promise((resolve) => {
        const userButton =
          topBar.querySelector<HTMLButtonElement>('.css-1cdmsla')!
        userButton.click()
        requestAnimationFrame(() => {
          const editIDMenuItem =
            document.querySelector<HTMLDivElement>('.css-y6z4l5')!
          editIDMenuItem.click()
          requestAnimationFrame(() => {
            const closeButton =
              document.querySelector<HTMLButtonElement>('.css-1ecu4hv')!
            const idInput =
              document.querySelector<HTMLInputElement>('#characterName')!
            const submitButton = document.querySelector<HTMLButtonElement>(
              '.css-1pv2q34[type=submit]'
            )!
            resolve({ closeButton, idInput, submitButton })
          })
        })
      })
    }

    const setID = async (id: string): Promise<void> => {
      const { idInput, submitButton } = await openIDModal()
      simulateNativeInput(idInput, id)
      submitButton.click()
    }

    inputArea.addEventListener('input', (e) => {
      setInputContent((e.target as HTMLTextAreaElement).value)
    })

    createEffect(
      on(inputContent, (v) => {
        simulateNativeInput(inputArea, v)
      })
    )

    return {
      bottomBar,
      dialog,
      topBar,
      inputArea,
      sendButton,
      inputContent,
      setInputContent,
      openIDModal,
      setID
    }
  })
  return memo
}

export function formatImportString (importString: string): Partial<Character> {
  const namePattern = /(?<=\.st )(?:([\p{Script=Han}|\w]+?)(?:[- ]|？))?(.+)/gu
  const nameMatch = namePattern.exec(importString)
  if (nameMatch == null) {
    return {}
  }

  const name = nameMatch[1]
  const attrString = nameMatch[2]

  const attrPattern = /([\p{Script=Han}|\w]+?)(\d+)/gu
  const result: Record<string, number> = {}
  for (
    let match = attrPattern.exec(attrString);
    match !== null;
    match = attrPattern.exec(attrString)
  ) {
    result[match[1]] = parseInt(match[2])
  }

  return {
    name,
    attributes: result,
    active: false
  }
}
