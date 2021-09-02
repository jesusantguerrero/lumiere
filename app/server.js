require('dotenv').config()
const { runBackground } = require('./utils/runBackground');
const { runNotifications } = require('./utils/runNotifications');
const express = require('express');
const app = express()

app.get('/background', async (_req, res) => {
    await runBackground()
    res.send('Background ran')
})

app.get('/background-notifications', async (_req, res) => {
    await runNotifications();
    res.send('notifications ran')
})

app.get('/', async (_req, res) => {
    res.send('Welcome to supadown API')
})

app.listen(process.env.PORT || 3000)