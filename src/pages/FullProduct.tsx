import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IProduct } from '../@types/product.type'
import styles from "./FullProduct.module.scss"
import { Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../redux/store'
import { removeProduct } from '../redux/slices/productSlice'
import { PAGES } from '../constants/url.constants'


const FullProduct: React.FC = () => {
	const { id } = useParams<{ id: string }>()
	const [product, setProduct] = useState<IProduct | null>(null)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

	useEffect(() => {
		const fetchPost = async () => {
			try {
				const { data } = await axios.get<IProduct>(
					`http://localhost:7777/products/${id}`
				)
				setProduct(data)
			} catch (error) {
				console.error('Помилка при завантаженні продукту:', error)
			}
		}
		fetchPost()
	}, [id])

  const handleOnDeleteProduct = () => {
    //@ts-ignore
    dispatch(removeProduct(id))
    navigate(PAGES.HOME)
  }

	return (
		<div>
			{product ? (
				<div className={styles.root}>
					<p>Name: {product.name}</p>
					<p>Count: {product.count}</p>
					<p>Width: {product.width} cm</p>
					<p>Height: {product.height} cm</p>
					<p>Weight: {product.weight} kg</p>
          <Button onClick={handleOnDeleteProduct} type='submit' color='error' variant='contained'>
						Delete product
					</Button>
				</div>
			) : (
				<p>Завантаження...</p>
			)}
		</div>
	)
}

export default FullProduct
