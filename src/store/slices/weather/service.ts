import axios, {AxiosResponse} from 'axios'


class WeatherService {
	async fetchData(startDate: string, endDate: string) {
		const url = `https://api.open-meteo.com/v1/forecast?latitude=55.7522&longitude=37.6156&hourly=temperature_2m,rain&timezone=Europe%2FMoscow&start_date=${startDate}&end_date=${endDate}`
		const response: AxiosResponse = await axios.get(url)
		return response.data
	}
}


export default new WeatherService()
