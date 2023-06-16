import type { FC, ReactNode } from 'react';
import type { IProduct } from 'src/controller/types';
import type { FormikProps } from 'formik';

import InputText from 'src/view/ui/InputText';
import { castedKeys, castedValues } from 'src/model/constants';

interface ProductFormProps {
	formik: FormikProps<Partial<IProduct>>;
	skippedValues: (keyof IProduct)[];
	onChange: (
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLSelectElement>,
		name: string
	) => void;
	className?: string;
	children?: ReactNode;
}

const ProductForm: FC<ProductFormProps> = ({
	formik,
	skippedValues,
	className,
	children,
	onChange,
}) => {
	return (
		<div className={className}>
			{Object.values<keyof IProduct>(castedKeys)
				.filter((key) => !skippedValues.includes(key))
				.map((key) => (
					<InputText
						key={`${children ? 'edit' : 'add'}-form-${key}`}
						name={key}
						value={formik.values[key] as string | number}
						onChange={onChange}
						onBlur={formik.handleBlur}
						error={
							formik.touched[key] && (formik.errors[key] as string | false)
						}
						label={castedValues[key] as string}
					/>
				))}
			{children}
		</div>
	);
};

export default ProductForm;
