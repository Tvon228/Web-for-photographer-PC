import { FormEvent, useRef } from "react"
import classes from "./Input.module.sass"

type InputProps = {
	value: string
	update: (newValue: string) => void
	label: string
	name: string 
}

export default function Input({ value, update, label, name}: InputProps) {
	const inputRef = useRef<HTMLInputElement>(null)

	const inputAction = () => {
        if (!inputRef.current) return
		update(inputRef.current.value.trim())
	}

	const inputBoxClasses =
		value.trim() == "" ? classes.input_box : classes.input_box_filled

	return (
		<div className={inputBoxClasses}>
			<input
				ref={inputRef}
				onInput={inputAction}
				type="text"
				value={value}
				name={name}
			/>
			<label>{label}</label>
		</div>
	)
}
