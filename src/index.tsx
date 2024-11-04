/* @refresh reload */
import { render } from 'solid-js/web'

import App from './App'
import { setEqual, setSubtract } from './utils'
import './index.css'

let mountPoints = new Set<HTMLDivElement>()

function renderApp (mountPoint: HTMLDivElement): void {
  mountPoint.style.rowGap = '5px'
  mountPoint.style.columnGap = '5px'

  const root = (<div class="col-start-1 col-end-4" />) as HTMLDivElement
  mountPoint.appendChild(root)
  render(() => <App />, root)
}

const mutationObserver = new MutationObserver((mutations) => {
  const newMountPoints = new Set(
    document.querySelectorAll<HTMLDivElement>('.css-1pgii3c')
  )
  if (!setEqual(mountPoints, newMountPoints)) {
    const newPoints = setSubtract(newMountPoints, mountPoints)
    newPoints.forEach((mountPoint) => {
      renderApp(mountPoint)
    })
    mountPoints = newMountPoints
  }
})
mutationObserver.observe(document.body, { childList: true, subtree: true })
