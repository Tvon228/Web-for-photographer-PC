'use client'

import classes from "@/styles/gallery.module.sass"
import { useState } from "react"
import Image from "next/image"

export default function addGalary() {
	const [isSelected, setIsSelected] = useState(false); 

	const handleClick = () => {
    	setIsSelected(!isSelected); 
  	};

    return(
		<div className={classes.Full}>
			<div className={classes.top_panel}>
				<div>Мои Галереи</div>
			</div>
			<div className={classes.Add}>
				<button>
					<div>Добавить</div>
				</button>
			</div>
			<div className={classes.block}>
				<div className={classes.inf_galary}>

					{/*Поменять класс number в меняющийся номер галереи по счету в базе данных*/}
					<div className={classes.number_galary}>
						№ Галереи:
					    <div>121212</div>
					</div>
			
					<div className={classes.status_galary}>
						Статус галереи:
						
						{/*Поменять класс Add в меняющийся статус "Активен, Не активен"*/}
						<div>		
							Активен 							
						</div>
					</div>
				</div>

				<div className={classes.edit_galary} >
					<Image src="/icons/edit.png" width={45} height={45} style={{ cursor: 'pointer' }} title="Редактирование" alt="Edit"/>
					<Image src="/icons/delete.png" width={34} height={34} style={{ cursor: 'pointer' }} title="Удалить галерею" alt="Delete"/>
				</div>

			</div>
			<div className={classes.disable_block}>
				<div>. . .</div>
			</div>
		</div>
    );
}