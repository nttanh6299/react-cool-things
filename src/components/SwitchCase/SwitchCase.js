import React, { useContext, useState } from "react"

const SwitchContext = React.createContext()

function ensureArray(ar) {
  return Array.isArray(ar) ? ar : [ar].filter((f) => f !== undefined)
}

function noop() { }

export function Switch({ value, children }) {
  const [switchContext] = useState({ cases: {} })
  switchContext.value = value
  return <SwitchContext.Provider value={switchContext}>{children}</SwitchContext.Provider>
}


export function Case({ when, children, execute = noop }) {
  const toCheck = ensureArray(when)
  const { value, cases } = useContext(SwitchContext)
  let condition = toCheck.some((when) => {
    if (typeof when === "function") {
      return when(value)
    } else {
      return when === value
    }
  })

  cases["" + when] = condition
  if (condition) {
    execute()
    return <>{children}</>
  } else {
    return null
  }
}

export function CaseElse({ children }) {
  const { cases } = useContext(SwitchContext)
  if (!Object.values(cases).some((v) => !!v)) {
    return <>{children}</>
  }
  return null
}
