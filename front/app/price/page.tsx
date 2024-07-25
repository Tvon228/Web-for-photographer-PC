"use client"

import classes from "./price.module.sass"
import Select from "react-select" 

const options = [
	{ value: "1", label: "Вариант 1"},
	{ value: "2", label: "Вариант 2"},
	{ value: "3", label: "Вариант 3"},
]

export default function Price() {

	return (
		<div className={classes.container}>
			<div className={classes.content}>
				<div className={classes.form}>
					<label className={classes.header}>
						Параметры и цены для галереи
					</label>
					<Select options={options}/>
				</div>
				<button className={classes.next_button}>
                    Далее
                </button>
			</div>
		</div>
	)
}
