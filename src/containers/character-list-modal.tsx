import type { Component } from 'solid-js'

import Modal from '@/components/modal'

import CharacterTable from './character-table'

interface CharacterListModalProps {
  shown: boolean;
  onClose: () => void;
}

const CharacterListModal: Component<CharacterListModalProps> = (props) => {
  return (
    <Modal shown={props.shown} title="身份列表" onClose={props.onClose}>
      <CharacterTable />
    </Modal>
  )
}

export default CharacterListModal
