import classes from "./saveButton.module.sass"

interface ButtonProps {
	onClick: () => void
	disabled: boolean
}

const Button: React.FC<ButtonProps> = ({ onClick, disabled }) => {
	return (
		<button
			className={
				classes.addButton +
				" " +
				(disabled && classes.disabled)
			}
			onClick={onClick}
			disabled={disabled}
		>
			Сохранить и выйти
		</button>
	)
}

export default Button
