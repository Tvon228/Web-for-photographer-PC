"use client"

import classes from "./gallery.module.sass"

import AddButton from "@/components/buttons/AddButton"
import GalleryList from "@/components/lists/GalleryList"


export default function Gallery() {
	return (
			<div className={classes.container}>
				<div className={classes.header}>Мои Галереи</div>	
				<AddButton/>
				<GalleryList />
			</div>
	)
}
