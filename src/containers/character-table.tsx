import type { Component } from 'solid-js'

import { For, createSignal } from 'solid-js'

import { useCharacterStore } from '@/store'
import { useGlobalContext } from '@/contexts/global-context'

import Button from '../components/button'

import AddCharacterModal from './add-character-modal'

const CharacterTable: Component = () => {
  const { characterList, setCharacterList, setActiveCharacter } =
    useCharacterStore()
  const [editShown, setEditShown] = createSignal(false)
  const { dialog } = useGlobalContext()

  return (
    <table class="tab-center">
      <thead>
        <tr>
          <th>角色名</th>
          <th>当前使用</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <For each={characterList()}>
          {(item) => (
            <tr>
              <AddCharacterModal
                initAttributes={item.attributes}
                initName={item.name}
                shown={editShown()}
                onClose={() => {
                  setEditShown(false)
                }}
              />
              <td>{item.name}</td>
              <td>{item.active ? '是' : '否'}</td>
              <td class="flex justify-around">
                <Button
                  variant="primary"
                  onClick={() => {
                    setActiveCharacter(item.name)
                    void dialog()?.setID(item.name)
                  }}
                >
                  启用
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    setEditShown(true)
                  }}
                >
                  重新导入
                </Button>
                <Button
                  variant="plain"
                  onClick={() => {
                    setCharacterList((prev) => {
                      const newList =
                        prev?.filter((i) => i.name !== item.name) ?? []
                      return newList
                    })
                  }}
                >
                  删除
                </Button>
              </td>
            </tr>
          )}
        </For>
      </tbody>
    </table>
  )
}

export default CharacterTable
