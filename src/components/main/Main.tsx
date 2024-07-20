import { Button, Menu, MenuItem } from '@mui/material'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { IProduct } from '../../@types/product.type'
import { RootState } from '../../redux/store'
import AddProductForm from '../add-product-form/AddProductForm'
import ProductItem from '../product-item/ProductItem'
import styles from './Main.module.scss'

const Main: React.FC = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const [sortCriterion, setSortCriterion] = useState<'name' | 'count'>('name')
	const open = Boolean(anchorEl)

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const handleSort = (criterion: 'name' | 'count') => {
		setSortCriterion(criterion)
		handleClose()
	}

	const { isAddProductFormOpened } = useSelector(
		(state: RootState) => state.globalSlice
	)

	const products = useSelector(
		(state: RootState) => state.productSlice.products.items
	)
	console.log(products)

	const sortedProducts =
		Array.isArray(products) &&
		products.slice().sort((a, b) => {
			if (sortCriterion === 'count') {
				//@ts-ignore
				return b.count - a.count
			} else {
				//@ts-ignore
				return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
			}
		})

	return (
		<main className={styles.root}>
			<div className={styles.top}>
				<div>
					<Button
						id='basic-button'
						aria-controls={open ? 'basic-menu' : undefined}
						aria-haspopup='true'
						aria-expanded={open ? 'true' : undefined}
						onClick={handleClick}
					>
						Sort products by
					</Button>
					<Menu
						id='basic-menu'
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						MenuListProps={{
							'aria-labelledby': 'basic-button',
						}}
					>
						<MenuItem onClick={() => handleSort('count')}>By count</MenuItem>
						<MenuItem onClick={() => handleSort('name')}>By name</MenuItem>
					</Menu>
				</div>
				<p className={styles.list__title}>Products list</p>
			</div>

			<ul className={styles.products__list}>
				{Array.isArray(sortedProducts) &&
					sortedProducts.map((product: IProduct) => (
						<ProductItem key={product._id} product={product} />
					))}
			</ul>
			{isAddProductFormOpened && <AddProductForm />}
		</main>
	)
}
export default Main
