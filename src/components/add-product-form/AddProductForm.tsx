import { Button, styled, TextField } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { IProduct } from '../../@types/product.type'
import { setIsAddProductFormOpened } from '../../redux/slices/globalSlice'
import styles from './AddProductForm.module.scss'
import { createProduct } from '../../redux/slices/productSlice'
import { AppDispatch } from '../../redux/store'

const AddProductForm: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IProduct>({ mode: 'onChange' })

	const handleOnSubmit: SubmitHandler<IProduct> = data => {
		dispatch(setIsAddProductFormOpened(false))
		dispatch(createProduct(data))
	}


	return (
		<div className={styles.root}>
			<form onSubmit={handleSubmit(handleOnSubmit)}>
				<TextField
					{...register('name', {
						required: {
							value: true,
							message: 'Name field is required',
						},
					})}
					label='Product name'
					variant='outlined'
					error={!!errors.name}
					helperText={errors.name ? errors.name.message : ''}
				/>
				<TextField
					{...register('count', {
						required: {
							value: true,
							message: 'Count field is required',
						},
					})}
					label='Product count'
					variant='outlined'
					error={!!errors.count}
					helperText={errors.count ? errors.count.message : ''}
				/>
				<TextField
					{...register('width', {
						required: {
							value: true,
							message: 'Width field is required',
						},
					})}
					label='Product width in cm'
					variant='outlined'
					error={!!errors.width}
					helperText={errors.width ? errors.width.message : ''}
				/>
				<TextField
					{...register('height', {
						required: {
							value: true,
							message: 'Height field is required',
						},
					})}
					label='Product height in cm'
					variant='outlined'
					error={!!errors.height}
					helperText={errors.height ? errors.height.message : ''}
				/>
				<TextField
					{...register('weight', {
						required: {
							value: true,
							message: 'Weight field is required',
						},
					})}
					label='Product weight in kg'
					variant='outlined'
					error={!!errors.weight}
					helperText={errors.weight ? errors.weight.message : ''}
				/>
			

				<div className={styles.btn__wrapper}>
					<Button type='submit' color='success' variant='contained'>
						Confirm
					</Button>
					<Button
						onClick={() => dispatch(setIsAddProductFormOpened(false))}
						variant='contained'
					>
						Cancel
					</Button>
				</div>
			</form>
		</div>
	)
}

export default AddProductForm
