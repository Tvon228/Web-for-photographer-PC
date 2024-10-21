"use client"

import AddPhotoButton from "@/components/buttons/addPhotoButton/addPhotoButton"
import classes from "@/styles/photosPage.module.sass"

export default function Photos() {

	return (
		<div className={classes.container}>
			<div className={classes.header}>
				<h1>Фотографии галереи</h1>
			</div>
			<div className={classes.top_bar}>
				<AddPhotoButton />
			</div>
			<div className={classes.photos}>
				<div className={classes.photo}></div>
				<div className={classes.photo}></div>
				<div className={classes.photo}></div>
				<div className={classes.photo}></div>
				<div className={classes.photo}></div>
				<div className={classes.photo}></div>
				<div className={classes.photo}></div>
				<div className={classes.photo}></div>
				<div className={classes.photo}></div>
				<div className={classes.photo}></div>
				<div className={classes.photo}></div>
				<div className={classes.photo}></div>
			</div>
		</div>
	)
}
