import { MonthWeatherType } from '@/src/interfaces/types'

export interface WeatherModel {
	fetching: boolean
	error: boolean
	data: MonthWeatherType []
}
