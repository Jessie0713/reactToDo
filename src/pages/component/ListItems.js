import React, { useState, useEffect } from 'react'
import { Box, TextField, IconButton, Checkbox } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import DeleteIcon from '@mui/icons-material/Delete'
import ListItem from '@mui/material/ListItem'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import ListItemText from '@mui/material/ListItemText'
import CloseIcon from '@mui/icons-material/Close'
import Hider from './Hider'
import { del, put } from 'aws-amplify/api'
import CircularProgress from '@mui/material/CircularProgress'

export default function ListItems({
  item = { text: '', finish: '', id: '' },
  getItem,
  setGetItem,
  index,
}) {
  const [edit, setEdit] = useState(true)
  const [editText, setEditText] = useState('')
  const [check, setCheck] = useState(item.finish === 'yes' ? true : false)
  const [itemLoad, setItemLoad] = useState(false)

  useEffect(() => {
    setCheck(item.finish === 'yes' ? true : false)
  }, item.check)

  const handleUpdateItem = async (text, finish) => {
    let response = put({
      apiName: 'todolist',
      path: '/index',
      options: {
        body: {
          id: item.id,
          text,
          finish,
        },
      },
    })
    let result = await response.response
    result = await result.body.json().then((res) => {
      console.log('res', res)
    })
  }
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
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Hider show={itemLoad}>
              <CircularProgress size={25} />
              <Box>
                <IconButton
                  onClick={() => {
                    setEditText(item.text)
                    setEdit(false)
                  }}
                >
                  <ModeEditIcon />
                </IconButton>
                <IconButton
                  onClick={async () => {
                    setItemLoad(true)
                    console.log(item.id, item.finish)
                    try {
                      const response = del({
                        apiName: 'todolist',
                        path: '/index',
                        options: {
                          queryParams: {
                            id: item.id,
                          },
                        },
                      })
                      let result = await response.response
                      result = await result.body.json().then((res) => {
                        console.log('res', res)
                        let items = getItem.filter((row) => row.id !== item.id)
                        setGetItem(items)
                        setItemLoad(false)

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
            </Hider>
          </Box>
        }
      >
        <Checkbox
          checked={check}
          onChange={async (e) => {
            setCheck(e.target.checked)
            let finish = e.target.checked ? 'yes' : 'no'
            getItem[index].finish = finish

            await handleUpdateItem(item.text, finish)
            let items = [...getItem].sort((a, b) => {
              if (a.finish === 'no' && b.finish === 'yes') {
                return -1
              } else if (a.finish === 'yes' && b.finish === 'no') {
                return 1
              } else {
                return b.id - a.id
              }
            })
            // console.log('test', test)
            await setGetItem(items)
            // setCheck(test[item.id].check)
          }}
        />
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
              handleUpdateItem(editText, check === true ? 'yes' : 'no')
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
