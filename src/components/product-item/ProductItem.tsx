import { Link } from 'react-router-dom'
import { IProduct } from '../../@types/product.type'
import { PAGES } from '../../constants/url.constants'
import styles from './ProductItem.module.scss'

interface ProductItemProps {
	product: IProduct
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
	return (
		<Link to={PAGES.FULL_PRODUCT + product._id}>
			<div className={styles.root}>
				<p className={styles.product__name}>Name: {product.name}</p>
				<p className={styles.product__name}>Count: {product.count}</p>
				<p className={styles.product__name}>Width: {product.width} cm</p>
				<p className={styles.product__name}>Height: {product.height} cm</p>
				<p className={styles.product__name}>Weight: {product.weight} kg</p>
			</div>
		</Link>
	)
}

export default ProductItem
