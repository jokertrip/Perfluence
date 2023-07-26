import {useRouter} from 'next/router'
import Link from 'next/link'
import {Tabs, Tab, makeStyles} from '@material-ui/core'

const useStyles = makeStyles({
	root: {
		backgroundColor: 'black',
		color: 'white',
		'&$selected': {
			color: 'red',
		},
	},
	indicator: {
		backgroundColor: 'red',
	},
	selected: {},
})

const TabMenu = () => {
	const classes = useStyles()
	const router = useRouter()
	const tabs = [
		{label: 'Обзор', href: '/overview'},
		{label: 'Графики', href: '/graphs'},
	]

	const currentTabIndex = tabs.findIndex(tab => tab.href === router.pathname)

	return (
		<Tabs
			value={currentTabIndex}
			classes={{indicator: classes.indicator}}
		>
			{tabs.map((tab, index) => (
				<Link key={index} href={tab.href} passHref>
					<Tab
						label={tab.label}
						style={{ color: 'white' }}
						classes={{
							root: classes.root,
							selected: classes.selected,
						}}
					/>
				</Link>
			))}
		</Tabs>
	)
}

export default TabMenu
