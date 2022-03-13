import mongoose from 'mongoose'
const stringRequired = {
  type: String,
  required: true
}
const numberRequired = {
  type: String,
  required: true
}
const userlogshcema = new mongoose.Schema({
  userid: stringRequired,
  logs: [
    {
      date: numberRequired,
      heartrate: numberRequired,
      breatherate: numberRequired,
      emotion: stringRequired,
      result: stringRequired
    }
  ]
})

export default mongoose.model('user-logging', userlogshcema)
