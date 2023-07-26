import {createAsyncThunk} from '@reduxjs/toolkit'
import WeatherService from './service'

const FETCH_ALL_DATA = 'fetch_all_data'

export const fetchAllData = createAsyncThunk(
	FETCH_ALL_DATA,
	async (_, {rejectWithValue}) => {
		try {
			const dateRanges = generatePastYearDateRange()

			const promises = [];

			for(let i = 0; i < dateRanges.startDates.length; i++) {
				promises.push(WeatherService.fetchData(dateRanges.startDates[i], dateRanges.endDates[i]));
			}

			const data = await Promise.all(promises);

			return await Promise.all(data.map(async (response, index) => {
				const monthData = response.hourly

				const temperatures = monthData.temperature_2m
				const rain = monthData.rain

				const maxTemp = Math.max(...temperatures)
				const minTemp = Math.min(...temperatures)

				const rainyThreshold = 0.1
				let rainyDays = 0
				for (let i = 0; i < rain.length; i += 24) {
					const dayRain = rain.slice(i, i + 24).reduce((a: number, b: number) => a + b, 0)
					if (dayRain > rainyThreshold) {
						rainyDays += 1
					}
				}

				const monthName = new Intl.DateTimeFormat('en-US', {month: 'long'}).format(new Date(dateRanges.startDates[index]))

				return {
					month: monthName,
					maxTemp,
					minTemp,
					rainyDays,
				}
			}))
		} catch (e) {
			console.error('Error processing month:', e);
			if (e instanceof Error) {
				return rejectWithValue(e.message)
			}
			return rejectWithValue("An unknown error occurred.")
		}
	}
)

const generatePastYearDateRange = () => {
	const dateRanges = {
		startDates: [] as string[],
		endDates: [] as string[]
	}
	const pastYear = new Date(new Date().setFullYear(new Date().getFullYear() - 1))

	for (let i = 0; i < 12; i++) {
		const startDate = new Date(pastYear.getFullYear(), pastYear.getMonth() + i, 1)
		startDate.setMinutes(startDate.getMinutes() - startDate.getTimezoneOffset())

		const endDate = new Date(pastYear.getFullYear(), pastYear.getMonth() + i + 1, 0)
		endDate.setMinutes(endDate.getMinutes() - endDate.getTimezoneOffset())

		dateRanges.startDates.push(startDate.toISOString().split('T')[0])
		dateRanges.endDates.push(endDate.toISOString().split('T')[0])
	}

	return dateRanges
}
