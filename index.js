import express from 'express'
import { config } from 'dotenv'

import { initiateApp } from './src/initiate-app.js'
config({ path: './config/dev.config.env' })
import cors from 'cors'



const app = express();
app.use(cors())
initiateApp(app, express)
