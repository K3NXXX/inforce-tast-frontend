import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import Header from './components/header/Header'
import Main from './components/main/Main'
import './global.scss'
import { getProducts } from './redux/slices/productSlice'
import { AppDispatch } from './redux/store'
import { PAGES } from './constants/url.constants'
import FullProduct from './pages/FullProduct'

const App: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>()

	useEffect(() => {
		dispatch(getProducts())
	}, [dispatch])

	return (
		<div className='App'>
			<Header />
			<Routes>
				<Route path={PAGES.HOME} element={<Main />} />
				<Route path={PAGES.FULL_PRODUCT + ':id'} element={<FullProduct />} />
			</Routes>
		</div>
	)
}

export default App
