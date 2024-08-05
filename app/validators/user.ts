import vine, { SimpleMessagesProvider }from '@vinejs/vine'
import { extname } from 'path'

const messages = { 
  required: 'The {{ field }} is required',}

  const fields = {
    userName: 'User_name',
    file: 'File',
    email: 'email',
    password: 'password'
  }

export const createPostValidator = vine.compile(
    vine.object({
      user_name: vine.string().trim().minLength(4),
      file: vine.file({extnames: ["jpg","jpeg","png"], size:"5mb"}).optional(),
      email: vine.string().trim().email(),
      password: vine.string()
    }))

    export const loginUserValidator = vine.compile(
      vine.object({
        user_name: vine.string().trim().minLength(4),
        email: vine.string().trim().email(),
        password: vine.string()
      }))

    vine.messagesProvider = new SimpleMessagesProvider(messages, fields)

    