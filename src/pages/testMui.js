import React, { useState } from 'react'
import { Box, Button, TextField, Card } from '@mui/material'
import { post } from 'aws-amplify/api'
const TestMui = () => {
  const [id, setId] = useState('')
  const [timeStamp, setTimeStamp] = useState('')
  return (
    <Box>
      <Card>
        <Box sx={{ mb: '3px' }}>
          <TextField
            id='standard-basic'
            label='id'
            variant='standard'
            sx={{ mr: '30px' }}
            onChange={(e) => {
              // console.log(e.target)
              setId(e.target.value)
            }}
            value={id}
          />
          <TextField
            id='standard-basic'
            label='timeStamp'
            variant='standard'
            value={timeStamp}
            onChange={(e) => {
              setTimeStamp(e.target.value)
            }}
          />
        </Box>
        <Button
          variant='outlined'
          onClick={async () => {
            try {
              const response = post({
                apiName: 'todolist',
                path: '/index',
                options: {
                  body: {
                    id,
                    timeStamp,
                  },
                },
              })
              let result = await response.response
              let result1 = await result.body
                .json()
                .then((res) => console.log('res', res))

              console.log(result1, result.body.json(), 'success', result.body)
            } catch (e) {
              console.log(e)
            }
          }}
        >
          put aws
        </Button>
      </Card>
    </Box>
  )
}

export default TestMui
