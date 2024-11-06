import classes from "./saveButton.module.sass"

import { cssIf } from "@/utils/utils"

interface ButtonProps {
	onClick: () => void
	disabled: boolean
}

export default function Button({ onClick, disabled }: ButtonProps) {
	return (
		<button
			className={
				cssIf(disabled, classes.addButtonDisabled, classes.addButton)
			}
			onClick={onClick}
			disabled={disabled}
		>
			Сохранить и выйти
		</button>
	)
}


