import { connect as connectToMongoose } from 'mongoose'
import { EXECUTION_MODE, MONGODB_CNX_STR } from '../config/config.js'

// initialize server
export async function connect() {
  if (EXECUTION_MODE === 'online') {
    // @ts-ignore
    await connectToMongoose(MONGODB_CNX_STR)
    console.log(`connected to DB: "${MONGODB_CNX_STR}"`);
  } else {
    console.log('working with local files persistence')
  }
}