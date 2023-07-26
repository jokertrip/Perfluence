import {FC} from 'react'
import {Grid, Typography} from '@material-ui/core'
import {useTypedSelector} from '@/src/store/store'
import Layout from '@/src/layouts/Layout'

const Overview: FC = () => {
	const weatherData = useTypedSelector((state) => state.weather.data)

	return (
		<Layout>
			<Grid container spacing={3}>
				<Grid item xs={4}>
					<Typography variant="h6">Month</Typography>
					{weatherData.map((monthData, index) => (
						<Typography key={index}>{monthData.month}</Typography>
					))}
				</Grid>
				<Grid item xs={4}>
					<Typography variant="h6">Max/Min</Typography>
					{weatherData.map((monthData, index) => (
						<Typography key={index}>{`${monthData.maxTemp}/${monthData.minTemp}`}</Typography>
					))}
				</Grid>
				<Grid item xs={4}>
					<Typography variant="h6">Rainy Days</Typography>
					{weatherData.map((monthData, index) => (
						<Typography key={index}>{monthData.rainyDays}</Typography>
					))}
				</Grid>
			</Grid>
		</Layout>
	)
}

export default Overview
