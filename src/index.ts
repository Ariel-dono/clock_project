import express from 'express'
import ActionFactory from './handlers/actionFactory.handler'
import SettingsController from './handlers/settings.handler'

// load the listed features at the app in a decoupled way
const app = new ActionFactory(
  express(),
  [
    new SettingsController()
  ],
  5000
)

app.listen()
