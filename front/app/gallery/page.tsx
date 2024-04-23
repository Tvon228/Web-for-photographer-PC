import classes from "@/styles/gallery.module.sass"

import AddButton from "@/components/buttons/AddButton"
import GalleryList from "@/components/lists/GalleryList"

export default function addGallary() {
	return (
		<div className={classes.container}>
			<div className={classes.header}>Мои Галереи</div>
			<AddButton />
			<GalleryList />
		</div>
	)
}
