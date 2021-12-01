import RoutingFactory from './routing/routingFactory.router'
import SettingsController from './routing/settings.router'

const app = new RoutingFactory(
  [
    new SettingsController()
  ],
  5000
)

app.listen()
