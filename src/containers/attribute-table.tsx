import type { Component } from 'solid-js'

import { For } from 'solid-js'

// TODO: 编辑

interface AttributeTableProps {
  attributes: Record<string, number>;
}

const AttributeTable: Component<AttributeTableProps> = (props) => {
  return (
    <table class="tab-center">
      <thead>
        <tr>
          <th>属性名</th>
          <th>属性值</th>
        </tr>
      </thead>
      <tbody>
        <For each={Object.entries(props.attributes)}>
          {(item) => (
            <tr>
              <td>{item[0]}</td>
              <td>{item[1]}</td>
            </tr>
          )}
        </For>
      </tbody>
    </table>
  )
}

export default AttributeTable
