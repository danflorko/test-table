import { memo } from 'react';
import type { FC, ReactNode } from 'react';

interface TableCellProps {
	children: ReactNode;
	className?: string;
	onClick?: () => void;
}

const TableCell: FC<TableCellProps> = ({ children, onClick, className }) => {
	return (
		<td
			className={className}
			onClick={onClick}
			style={{
				cursor: onClick && 'pointer',
			}}
		>
			{children}
		</td>
	);
};

export default memo(TableCell);
