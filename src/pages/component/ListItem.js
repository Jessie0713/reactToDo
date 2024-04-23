import React, { useState } from 'react'
import { Box, TextField, IconButton, Checkbox } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import DeleteIcon from '@mui/icons-material/Delete'
import ListItem from '@mui/material/ListItem'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import ListItemText from '@mui/material/ListItemText'
import CloseIcon from '@mui/icons-material/Close'
import Hider from './Hider'
import { post, del } from 'aws-amplify/api'

export default function ListItems({ item, getItem, setGetItem, index }) {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
  const [edit, setEdit] = useState(true)
  const [editText, setEditText] = useState('')
  return (
    <Hider show={edit}>
      <ListItem
        key={index}
        sx={{
          backgroundColor: '#FDEA8E',
          width: '40%',
          height: '40px',
          borderRadius: '16px',
          mb: '2px',
        }}
        secondaryAction={
          <Box>
            <IconButton
              edge='end'
              onClick={() => {
                setEditText(item.text)
                setEdit(false)
              }}
            >
              <ModeEditIcon />
            </IconButton>
            <IconButton
              edge='end'
              onClick={async () => {
                console.log(item.id, item.finish)
                try {
                  const response = del({
                    apiName: 'todolist',
                    path: '/index',
                    options: {
                      queryParams: {
                        id: item.id,
                        finish: item.finish,
                      },
                    },
                  })
                  let result = await response.response
                  result = await result.body.json().then((res) => {
                    console.log('res', res)
                    let items = getItem.filter((row) => row.id !== item.id)
                    setGetItem(items)

                    // getItems()
                  })
                } catch (e) {
                  console.log(e)
                }
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        }
      >
        <Checkbox {...label} defaultChecked />
        <ListItemText primary={item.text} />
      </ListItem>
      <ListItem
        key={index}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '40%',
        }}
      >
        <TextField
          id='outlined-basic'
          variant='outlined'
          className='customRounded'
          size='small'
          sx={{ width: '70%', ml: '-16px' }}
          value={editText}
          onChange={(e) => {
            setEditText(e.target.value)
          }}
        />
        <Box>
          <IconButton
            onClick={async () => {
              console.log('item', item)
              console.log('index', index)
              console.log(getItem[index].editText)
              getItem[index].text = editText
              setGetItem(getItem)
              setEdit(true)

              const response = post({
                apiName: 'todolist',
                path: '/index',
                options: {
                  body: {
                    id: item.id,
                    finish: item.finish,
                    text: editText,
                  },
                },
              })
              let result = await response.response
              result = await result.body.json().then((res) => {
                console.log('res', res)
              })
            }}
          >
            <CheckIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              setEdit(true)
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </ListItem>
    </Hider>
  )
}
