import React, {useEffect} from 'react'
import {fetchAllData} from '@/src/store/slices/weather/actions'
import {useTypedDispatch} from '@/src/store/store'
import TabMenu from '@/src/components/TabMenu'

const Layout: React.FC<{ children: React.ReactNode }> = ({children}) => {
	const dispatch = useTypedDispatch()

	useEffect(() => {
		dispatch(fetchAllData())
	}, [dispatch])

	return (
		<div>
			<TabMenu/>
			{children}
		</div>
	)
}

export default Layout
