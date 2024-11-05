/* @refresh reload */
import { render } from 'solid-js/web'

import App from './App'
import './index.css'

function renderApp (mountPoint: HTMLDivElement): void {
  mountPoint.style.rowGap = '5px'
  mountPoint.style.columnGap = '5px'

  const root = (<div class="col-start-1 col-end-4" />) as HTMLDivElement
  mountPoint.appendChild(root)
  render(() => <App />, root)
}

const mutationObserver = new MutationObserver((mutations) => {
  const newMountPoints = document.querySelectorAll<HTMLDivElement>(
    '.css-1pgii3c:not([boluo-attribute-extension-loaded])'
  )
  newMountPoints.forEach((mountPoint) => {
    mountPoint.setAttribute('boluo-attribute-extension-loaded', '')
    renderApp(mountPoint)
  })
})
mutationObserver.observe(document.body, { childList: true, subtree: true })
