import classes from "./GalleryCard.module.sass"

import { Gallery } from "@/types/entity.types"

import Image from "next/image"
import deleteIcon from "@/public/icons/delete.png"
import Withicon from "../menu/withicon/withicon"

export default function GalleryCard({ gallery }: { gallery: Gallery }) {
	return (
		<div className={classes.container}>
			<div className={classes.infoWrapper}>
				<div className={classes.infoItem}>
					<span>Номер галереи</span>
					<span className={classes.numbers}>{gallery.id}</span>
				</div>
				<div className={classes.infoItem}>
					<span>Статус галереи</span>
				</div>
				<div className={classes.infoItem}>
					<div className={classes.name_gallery}>
						<span>Название галереи</span>
						<span className={classes.info}>{gallery.name}</span>
					</div>
				</div>
			</div>
			<div className={classes.controlWrapper}>
				<Withicon />
				<Image
					src={deleteIcon}
					alt="Delete"
					className={classes.controlIcon}
				/>
			</div>
		</div>
	)
}
