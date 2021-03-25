import ReactDOM from 'react-dom'
import App from './app'
import reportWebVitals from './reportWebVitals'
import {AppProviders} from 'context'

const rootElement = document.getElementById('root')

if (rootElement!.hasChildNodes()) {
  ReactDOM.hydrate(
    <AppProviders>
      <App />
    </AppProviders>,
    rootElement,
  )
} else {
  ReactDOM.render(
    <AppProviders>
      <App />
    </AppProviders>,
    rootElement,
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
