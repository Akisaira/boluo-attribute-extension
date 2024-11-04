import type { Component } from 'solid-js'

import { createSignal, onMount } from 'solid-js'

import Icon from './components/icon'
import Popover from './components/popover'
import Switch from './components/switch'
import AddCharacterModal from './containers/add-character-modal'
import CharacterListModal from './containers/character-list-modal'
import SuggestionList from './containers/suggestion-list'
import { AddUser, Ninja, Replace } from './icon-set'
import { useDialogWindow } from './utils'
import { GlobalProvider } from './contexts/global-context'

const App: Component = () => {
  const [root, setRoot] = createSignal<HTMLDivElement | undefined>(undefined, {
    equals: false
  })
  const [autoReplacement, setAutoReplacement] = createSignal(false)
  const [characterListShown, setCharacterListShown] = createSignal(false)
  const [addCharacterShown, setAddCharacterShown] = createSignal(false)
  const dialog = useDialogWindow(root)

  onMount(() => {
    setRoot((prev) => prev)
  })

  return (
    <GlobalProvider value={{ dialog }}>
      <div ref={setRoot} class="flex flex-row">
        <CharacterListModal
          shown={characterListShown()}
          onClose={() => {
            setCharacterListShown(false)
          }}
        />
        <AddCharacterModal
          shown={addCharacterShown()}
          onClose={() => {
            setAddCharacterShown(false)
          }}
        />
        <div class="flex flex-row">
          <div class="mr-1">
            <Popover content="添加身份">
              <Switch
                onClick={() => {
                  setAddCharacterShown(true)
                }}
              >
                <Icon>
                  <AddUser />
                </Icon>
              </Switch>
            </Popover>
          </div>
          <div class="mr-2">
            <Popover content="自动属性值替换">
              <Switch
                value={autoReplacement()}
                onClick={() => {
                  setAutoReplacement((v) => !v)
                }}
              >
                <Icon>
                  <Replace />
                </Icon>
              </Switch>
            </Popover>
          </div>
          <div class="mr-1">
            <Popover content="身份管理">
              <Switch
                onClick={() => {
                  setCharacterListShown(true)
                }}
              >
                <Icon>
                  <Ninja />
                </Icon>
              </Switch>
            </Popover>
          </div>
          {/* FIXME: 溢出 */}
          <SuggestionList autoReplacement={autoReplacement()} />
        </div>
      </div>
    </GlobalProvider>
  )
}

export default App
