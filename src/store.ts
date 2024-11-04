import type { Accessor } from 'solid-js'

import { createResource, createMemo, createSignal } from 'solid-js'

import { GM, GM_addValueChangeListener } from '$'

export interface Character {
  name: string;
  attributes: Record<string, number>;
  active: boolean;
}

type CLSetterArg =
  | Character[]
  | ((prev: Character[] | undefined) => Character[])

interface CharacterStore {
  characterList: Accessor<Character[] | undefined>;
  setCharacterList: (value: CLSetterArg) => Character[];
  activeCharacter: () => Character | undefined;
  setActiveCharacter: (name: string) => void;
  addCharacter: (newCharacter: Character) => void;
  deleteCharacter: (name: string) => void;
}

const [characterList, { mutate: mutateCharacterList }] = createResource<
  Character[]
>(async () => await GM.getValue<Character[]>('boluoCharacterList', []))
const setCharacterList = (value: CLSetterArg): Character[] => {
  const newVal = mutateCharacterList(value)
  void GM.setValue('boluoCharacterList', newVal)
  return newVal
}

GM_addValueChangeListener<Character[]>(
  'boluoCharacterList',
  (_, __, newVal) => {
    void mutateCharacterList(newVal)
  }
)

export function useCharacterStore (): CharacterStore {
  const activeCharacter = createMemo((): Character | undefined => characterList()?.find((c) => c.active))
  const setActiveCharacter = (name: string): void => {
    characterList() != null &&
      setCharacterList((prev) => {
        return prev!.map((c) => {
          c.active = c.name === name
          return c
        })
      })
  }

  const deleteCharacter = (name: string): void => {
    setCharacterList((prev) => {
      return prev?.filter((c) => c.name !== name) ?? []
    })
  }

  const addCharacter = (newCharacter: Character): void => {
    deleteCharacter(newCharacter.name)
    setCharacterList((prev) => {
      return [...(prev ?? []), newCharacter]
    })
  }

  return {
    characterList,
    setCharacterList,
    activeCharacter,
    setActiveCharacter,
    deleteCharacter,
    addCharacter
  } as const
}

// eslint-disable-next-line solid/reactivity
const [, setModalZIndex] = createSignal<number>(3777)
export function useModalZIndex (): number {
  return setModalZIndex((prev) => prev + 1)
}
