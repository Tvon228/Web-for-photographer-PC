"use client"

import AddPhotoButton from "@/components/buttons/addPhotoButton/addPhotoButton"
import classes from "@/components/photoPage/photosPage.module.sass"

import { useEffect, useState, useRef } from "react"
import { useGetPhotosQuery } from "@/src/api"
import { Photo } from "@/types/entity.types"
import { cssIf } from "@/utils/utils"


export default function Photos({ galleryId }: { galleryId: number }) {
	const [photoList, setPhotoList] = useState<Photo[]>([])
	const { data: response, isLoading } = useGetPhotosQuery(galleryId)
	const [loaded, setLoaded] = useState(false)

	useEffect(() => {
		if (response) {
			setPhotoList(response.photos || [])
		}
	}, [response])

	useEffect(() => {
		if (photoList.length > 0) {
			const timer = setTimeout(() => {
				setLoaded(true)
			}, 150)

			return () => clearTimeout(timer)
		}
	}, [photoList])

	if (isLoading || !response) {
		return <div className={classes.loading}>Загрузка...</div>
	}

	return (
		<div className={classes.container}>
			<div className={classes.content}>
				<div className={classes.header}>
					<h1>Фотографии галереи</h1>
				</div>
				<div className={classes.top_bar}>
					<AddPhotoButton />
				</div>
			</div>
			<div className={classes.photos}>
				{photoList.length > 0 ? (
					renderPhoto(photoList, loaded)
				) : (
					<div>Нет фоток</div>
				)}
			</div>
		</div>
	)
}

function renderPhoto(listPhoto: Photo[], loaded: boolean) {
	return listPhoto.map((photo, index) => (
		<div
			key={photo.uuid}
			className={cssIf(
				loaded,
				classes.gallery_item,
				classes.gallery_itemNotVisible
			)}
		>
			<img
				src={`/uploads/${photo.uuid}${photo.extension}`}
				alt={photo.original_name}
				className={classes.photo}
			/>
			<div className={classes.cheek} />
		</div>
	))
}
