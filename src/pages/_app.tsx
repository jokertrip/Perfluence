import React from 'react'
import {Provider} from 'react-redux'
import {store} from '@/src/store/store'
import {AppProps} from 'next/app'
import {ThemeProvider, createTheme} from '@material-ui/core/styles'
import {CssBaseline} from '@material-ui/core'

const theme = createTheme({
	palette: {
		background: {
			default: '#000000'
		},
		text: {
			primary: '#ffffff'
		}
	}
});

const MyApp: React.FC<AppProps> = ({Component, pageProps}) => {
	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Component {...pageProps} />
			</ThemeProvider>
		</Provider>
	)
}

export default MyApp;
