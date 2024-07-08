import classes from "./GalleryCard.module.sass"

import { Gallery } from "@/types/entity.types"

import Withicon from "../menu/withicon/withicon";
import Image from "next/image"
import deleteIcon from "@/public/icons/delete.png"


export default function GalleryCard({ gallery }: { gallery: Gallery }) {


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
				</div>
			</div>
				<div className={classes.controlWrapper}>
					<Withicon/>
					<Image
						src={deleteIcon}
						alt="Delete"
						className={classes.controlIcon}
					/>
				</div>
		</div>
	)
}
