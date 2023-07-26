import {FC} from 'react'
import {Line} from 'react-chartjs-2'
import {useTypedSelector} from '@/src/store/store'
import Layout from '@/src/layouts/Layout'

const Graphs: FC = () => {
	const weatherData = useTypedSelector((state) => state.weather.data)

	const data = {
		labels: weatherData.map((monthData) => monthData.month),
		datasets: [
			{
				label: 'Max',
				data: weatherData.map((monthData) => monthData.maxTemp),
				fill: false,
				backgroundColor: 'rgb(255, 255, 255)',
				borderColor: 'rgb(255, 255, 255)',
			},
			{
				label: 'Min',
				data: weatherData.map((monthData) => monthData.minTemp),
				fill: false,
				backgroundColor: 'rgb(0, 0, 255)',
				borderColor: 'rgb(0, 0, 255)',
			},
		],
	}

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		scales: {
			x: {
				type: 'category',
				display: true,
				position: 'bottom',
				ticks: {
					color: 'white'
				}
			},
			y: {
				type: 'linear',
				display: true,
				position: 'left',
				beginAtZero: true,
				color: 'white'
			},
		},
	}

	return (
	<Layout>
		<div style={{height: '90vh'}}>
		<Line data={data} options={options}/>
		</div>
	</Layout>
	)
}

export default Graphs
