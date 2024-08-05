import classes from "./saveButton.module.sass"

interface ButtonProps {
	onClick: () => void
}

const Button: React.FC<ButtonProps> = ({ onClick }) => {
	return (
		<button className={classes.addButton} onClick={onClick}>
			Сохранить и выйти
		</button>
	)
}

export default Button
