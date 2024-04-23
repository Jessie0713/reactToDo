import awsmobile from './aws-exports'
import { Amplify } from 'aws-amplify'
import GlobalContextProvider from './src/context/GlobalContextProvider'
import React from 'react'
import './src/pages/style/global.css'
import { ThemeProvider } from '@mui/material'
import theme from './src/pages/theme/theme'

export const wrapRootElement = ({ element }) => {
  Amplify.configure(awsmobile)
  return (
    <GlobalContextProvider>
      <ThemeProvider theme={theme}>{element}</ThemeProvider>
    </GlobalContextProvider>
  )
}
