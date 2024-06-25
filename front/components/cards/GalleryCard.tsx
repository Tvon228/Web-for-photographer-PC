import classes from "./GalleryCard.module.sass"

import { Gallery } from "@/types/entity.types"
import { useSelector } from "react-redux"
import Withicon from "../menu/withicon/withicon";

export default function GalleryCard({ gallery }: { gallery: Gallery }) {

	const card = useSelector((state: any) => state.cards)

	console.log(card)

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
			<Withicon/>
		</div>
	)
}
