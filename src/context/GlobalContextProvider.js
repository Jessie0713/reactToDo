import React from 'react'

export const GlobalStateContext = React.createContext({})
const GlobalContextProvider = ({ children, location }) => {
  return (
    <GlobalStateContext.Provider value={{ location }}>
      {children}
    </GlobalStateContext.Provider>
  )
}
export default GlobalContextProvider
