import classes from "./GalleryCard.module.sass"
import editIcon from "@/public/icons/edit.png"
import deleteIcon from "@/public/icons/delete.png"

import Image from "next/image"

import { Gallery } from "@/types/entity.types"
import { useDispatch, useSelector } from "react-redux"
import { DeleteCards } from "@/src/slice/cards"

export default function GalleryCard({ gallery }: { gallery: Gallery }) {

	
	const card = useSelector((state: any) => state.cards)

	console.log(card)
	
	const dispatch = useDispatch()
	const handleRemoveCard = (cardId: any) => {
		dispatch(DeleteCards(cardId))
	}

	

	return (
		<div className={classes.container}>
			<div className={classes.infoWrapper}>
				<div className={classes.infoItem}>
					<span>Название галереи</span>
					<span>{gallery.name}</span>
				</div>

				<div className={classes.infoItem}>
					<span>Номер галереи</span>
					<span>{gallery.id}</span>
				</div>
				<div className={classes.infoItem}>
					<span>Статус галереи</span>
					<span
						className={
							gallery.status ? classes.active : classes.inactive
						}
					>
						{gallery.status ? "Активна" : "Неактивна"}
					</span>
				</div>
			</div>
			<div className={classes.controlWrapper}>
				<Image
					src={editIcon}
					alt="Edit"
					className={classes.controlIcon}
				/>
				<Image
					src={deleteIcon}
					alt="Delete"
					className={classes.controlIcon}
					onClick={() => handleRemoveCard(card.id)}
				/>
			</div>
		</div>
	)
}
