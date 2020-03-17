import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import DevTools from 'mobx-react-devtools'
import { MuiThemeProvider } from 'material-ui/styles'
import { message } from 'antd'
import 'typeface-roboto'
import './constants.js'
import { theme } from './styles/index'
import 'antd/dist/antd.css'

import RulesConfigurator from './pages/RulesConfigurator'

import * as serviceWorker from './serviceWorker'
// import './index.css';

//----------------------------------------
import stores from './stores'

function setMessageConfig() {
	message.config({
		top: 100,
		duration: 2,
		maxCount: 5,
	})
}

function App() {
	return (
		<Provider {...stores}>
			<MuiThemeProvider theme={theme}>
				{(!process.env.NODE_ENV || process.env.NODE_ENV === 'development') && <DevTools />}
				<RulesConfigurator />
			</MuiThemeProvider>
		</Provider>
	)
}

// window.BASE_API_ADDR = '.';

ReactDOM.render(<App />, document.getElementById('root'))
setMessageConfig()
serviceWorker.unregister()
