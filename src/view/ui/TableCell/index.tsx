import { memo } from 'react';
import classNames from 'classnames';
import type { FC, ReactNode } from 'react';

import './styles.scss';

interface TableCellProps {
	children: ReactNode;
	className?: string;
	onClick?: () => void;
}

const TableCell: FC<TableCellProps> = ({ children, onClick, className }) => {
	return (
		<td
			className={classNames(className, 'cell', { clickable: !!onClick })}
			onClick={onClick}
		>
			{children}
		</td>
	);
};

export default memo(TableCell);
