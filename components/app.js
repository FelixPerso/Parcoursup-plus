import {mount, register} from '../riot/riot.min.js'
import App from './my-app.riot'


register("my-app", App)
mount("my-app")