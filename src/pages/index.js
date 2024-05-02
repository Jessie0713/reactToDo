import * as React from 'react'
import Link from '@mui/material/Link'

import { Box, Button, TextField, Card, Typography } from '@mui/material'

const IndexPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <Card>
        <Typography>Login Page</Typography>
      </Card>
    </Box>
  )
}

export default IndexPage

export const Head = () => <title>Home Page</title>
