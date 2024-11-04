import type { Component } from 'solid-js'

import { For, createEffect, on, createMemo } from 'solid-js'

import Suggestion from '@/components/suggestion'
import { useGlobalContext } from '@/contexts/global-context'
import {
  getReplacementSuggestions,
  replaceAttribute
} from '@/hooks/attr-replacement'
import { useCharacterStore } from '@/store'

interface SuggestionListProps {
  autoReplacement: boolean;
}

const SuggestionList: Component<SuggestionListProps> = (props) => {
  const { activeCharacter } = useCharacterStore()
  const { dialog } = useGlobalContext()

  const suggestions = createMemo(() => getReplacementSuggestions(
    dialog()?.inputContent() ?? '',
    activeCharacter()?.attributes ?? {}
  ))

  createEffect(
    on(
      () => ({
        suggestions: suggestions(),
        auto: props.autoReplacement,
        dialog: dialog()
      }),
      ({ suggestions, auto, dialog }) => {
        if (auto) {
          const suggestion = suggestions[0]
          if (suggestion != null) {
            dialog?.setInputContent((prev) => replaceAttribute(prev, suggestion))
          }
        }
      }
    )
  )

  return (
    <div class="flex-1 grid grid-rows-1 grid-flow-col gap-2">
      <For each={suggestions()}>
        {(item) => (
          <Suggestion
            {...item}
            onClick={() => {
              dialog()?.setInputContent((prev) => replaceAttribute(prev, item))
            }}
          />
        )}
      </For>
    </div>
  )
}

export default SuggestionList
