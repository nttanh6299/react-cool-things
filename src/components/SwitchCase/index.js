import React from 'react'
import { Switch, Case, CaseElse } from './SwitchCase'

const column = {
  type: 'action',
  name: 'switch case example'
}

function render() {
  return (
    <Switch value={column.type}>
      <Case when="action">
        <div>action case</div>
      </Case>
      <Case when={["more", "than", "one", "reason", () => column.name === "including this!"]}>
        {/* Some other cell */}
      </Case>
      {/* Other cases */}
      <CaseElse>
        <div>default</div>
      </CaseElse>
    </Switch>
  )
}


export default render
