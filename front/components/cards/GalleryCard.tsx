"use client"

import classes from "./GalleryCard.module.sass"

import { useRouter } from "next/navigation"
import { Gallery } from "@/types/entity.types"
import { useDeleteGalleryMutation } from "@/src/api"

import Image from "next/image"
import readyIcon from "@/public/icons/ready.png"
import editIcon from "@/public/icons/edit.png"
import movephotoIcon from "@/public/icons/movephoto.png"
import deleteIcon from "@/public/icons/delete.png"

import toast from "react-hot-toast" 
import useEditModal from "@/hooks/useEditModal.hook"

interface GalleryCardProps {
	gallery: Gallery
	onDelete: (id: number) => void 
}

export default function GalleryCard({ gallery, onDelete }: GalleryCardProps) {
	const router = useRouter()

	const [deleteGallery] = useDeleteGalleryMutation()
	const [_, openEditModal] = useEditModal()

	const toPhotos = () => {
        router.push("/photos")
    }

	const handleEdit = () => {
		openEditModal(gallery)
	}

	const handleDelete = async () => {
		if (gallery.id === undefined) {
			console.error("Gallery ID is undefined")
			return
		}
		try {
			await deleteGallery(gallery.id).unwrap() 
			onDelete(gallery.id) 
			toast.success("Галерея успешно удалена!")
		} catch (error) {
			toast.error("Failed to delete gallery.")
			console.error("Ошибка удаления галереи:", error)
		}
	}

	return (
		<div className={classes.conteiner}>
			<div className={classes.content}>
				<div className={classes.cover}></div>
				<div className={classes.information}>
					<div className={classes.header}>
						<span>{gallery.name}</span>
						<div className={classes.state}>
							<Image
								src={readyIcon}
								alt="gallery ready"
								className={classes.controlIcon}
							/>
							<span>Готово</span>
						</div>
					</div>
					<div className={classes.buttons}>
						<button onClick={toPhotos} className={classes.edit_photos}>
							<Image
								src={movephotoIcon}
								alt="move photo"
								className={classes.buttonIcon}
							/>
							Перейти к фото
						</button>
						<button onClick={handleEdit} className={classes.redaction}>
							<Image
								src={editIcon}
								alt="edit"
								className={classes.buttonIcon}
							/>
							Редактировать
						</button>
						<Image
							src={deleteIcon}
							alt="delete"
							className={classes.deleteIcon}
							onClick={handleDelete}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
