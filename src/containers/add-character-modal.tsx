import type { Component } from 'solid-js'

import { createEffect, on, Show } from 'solid-js'
import { createStore } from 'solid-js/store'

import Button from '@/components/button'
import Input from '@/components/input'
import Modal from '@/components/modal'
import { useCharacterStore } from '@/store'
import { formatImportString } from '@/utils'
import { useGlobalContext } from '@/contexts/global-context'
import Popover from '@/components/popover'

import AttributeTable from './attribute-table'

interface AddCharacterModalProps {
  shown: boolean;
  onClose: () => void;
  initName?: string;
  initAttributes?: Record<string, number>;
}

interface NewCharacter {
  name: string;
  importString: string;
  attributes: Record<string, number>;
}

const AddCharacterModal: Component<AddCharacterModalProps> = (props) => {
  const { addCharacter, setActiveCharacter } = useCharacterStore()
  const [newCharacter, setNewCharacter] = createStore<NewCharacter>({
    // eslint-disable-next-line solid/reactivity
    name: props.initName ?? '',
    importString: '',
    // eslint-disable-next-line solid/reactivity
    attributes: props.initAttributes ?? {}
  })
  const { dialog } = useGlobalContext()

  createEffect(
    on(
      () => newCharacter.importString,
      (val) => {
        const resolved = formatImportString(val)
        if (resolved.name != null) {
          setNewCharacter((prev) => ({ ...prev, name: resolved.name }))
        }

        if (resolved.attributes != null) {
          setNewCharacter((prev) => ({
            ...prev,
            attributes: resolved.attributes
          }))
        }
      }
    )
  )

  return (
    <Modal shown={props.shown} title="添加身份" onClose={props.onClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          void (async () => {
            addCharacter({
              name: newCharacter.name,
              attributes: newCharacter.attributes,
              active: false
            })
            setActiveCharacter(newCharacter.name)
            void dialog()?.setID(newCharacter.name)
            props.onClose()
          })()
        }}
      >
        <div class="mb-4">
          <label class="block py-2">角色名称</label>
          <Input
            placeholder="要导入的角色名称"
            value={newCharacter.name}
            onInput={(v) => {
              setNewCharacter((prev) => ({ ...prev, name: v }))
            }}
          />
        </div>
        <div class="mb-4">
          <Popover
            content={(
              <div>
                <p>支持如下格式：</p>
                <p>
                  <span>.st &lt;</span>
                  <i>角色名</i>
                  <span>&gt; &lt;</span>
                  <i>技能名</i>
                  <span>&gt;&lt;</span>
                  <i>数值</i>
                  <span>&gt;</span>
                </p>
                <p>例如：</p>
                <p>.st 雄狮雷文 力量100智力0STR100INT0</p>
              </div>
            )}
          >
            <label class="block py-2">导入字符串</label>
          </Popover>
          <Input
            placeholder="请将骰娘导入字符串粘贴到这里"
            value={newCharacter.importString}
            onInput={(v) => {
              setNewCharacter((prev) => ({ ...prev, importString: v }))
            }}
          />
        </div>
        <Show when={Object.keys(newCharacter.attributes).length !== 0}>
          <div class="mb-4">
            <AttributeTable attributes={newCharacter.attributes} />
          </div>
        </Show>
        <div class="flex justify-end">
          <Button type="submit" variant="primary">
            添加并启用
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default AddCharacterModal
