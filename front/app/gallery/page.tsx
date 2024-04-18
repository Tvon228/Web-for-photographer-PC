import classes from "@/styles/gallery.module.sass"

import Image from "next/image"

import AddButton from "@/components/buttons/AddButton"
import GalleryList from "@/components/lists/GalleryList"

export default function addGalary() {
	return (
		<div className={classes.container}>
			<div className={classes.header}>Мои Галереи</div>
			<AddButton />
			<GalleryList />
		</div>
	)
}
