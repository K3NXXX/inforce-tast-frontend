import styles from './Header.module.scss'
import logo from "../../assets/logo.jpeg"
import { Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { setIsAddProductFormOpened } from '../../redux/slices/globalSlice'
import { TRUE } from 'sass'

const Header: React.FC = () => {
	const dispatch = useDispatch()
	return (
		<header className={styles.root}>
			<img className={styles.logo} src={logo} alt="logo" />
			<div>
			<Button onClick={() => dispatch(setIsAddProductFormOpened(true))} variant="contained">Add product</Button>
			</div>
		</header>
	)
}

export default Header
