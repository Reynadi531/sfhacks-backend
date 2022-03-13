import mongoose from 'mongoose'

export interface userSchemaInterface {
  userid: string
  name: string
  email: string
  password: string
  number: string
  age: number
  gender: string
}

const stringRequired = {
  type: String,
  required: true
}
const numberRequired = {
  type: Number,
  required: true
}
const userSchema = new mongoose.Schema({
  userid: stringRequired,
  name: stringRequired,
  email: stringRequired,
  password: stringRequired,
  number: numberRequired,
  age: numberRequired,
  gender: stringRequired,
  isSupervisor: {
    type: Boolean,
    required: true
  }
})

export default mongoose.model('user_data', userSchema)
