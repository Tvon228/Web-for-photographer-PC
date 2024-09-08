import { useEffect, useState } from "react"
import { Gallery } from "@/types/entity.types"
import { useGetGalleriesQuery, useDeleteGalleryMutation } from "@/src/api"
import GalleryCard from "../cards/GalleryCard"
import classes from "./List.module.sass"

function renderGalleries(list: Gallery[], onDelete: (id: number) => void) {
	return list.map((gallery) => (
		<GalleryCard key={gallery.id} gallery={gallery} onDelete={onDelete} />
	))
}

export default function GalleryList({ searchQuery }: { searchQuery: string }) {
	const { data: response, isLoading } = useGetGalleriesQuery()
	const [deleteGallery] = useDeleteGalleryMutation()
	const [galleries, setGalleries] = useState<Gallery[]>([]) // Локальное состояние для галерей

	useEffect(() => {
		if (response) {
			setGalleries(response.data) // Устанавливаем галереи из ответа
		}
	}, [response])

	const handleDelete = async (id: number) => {
		try {
			await deleteGallery(id).unwrap()
			// Обновляем локальное состояние, удаляя галерею
			setGalleries((prevGalleries) =>
				prevGalleries.filter((gallery) => gallery.id !== id)
			)
		} catch (error) {
			console.error("Ошибка удаления галереи:", error)
		}
	}

	if (isLoading || !response) {
		return <div className={classes.container}>Загрузка...</div>
	}

	const filteredGalleries = galleries.filter((gallery) => {
		const words = gallery.name.toLowerCase().split(" ")
		return words.some((word) => word.startsWith(searchQuery.toLowerCase()))
	})

	// Сортировка по id или по имени
	const sortedGalleries = filteredGalleries.sort((a, b) => a.id - b.id) // Сортировка по id

	return (
		<div className={classes.container}>
			{sortedGalleries.length > 0 ? (
				renderGalleries(sortedGalleries, handleDelete)
			) : (
				<div>Нет результатов</div>
			)}
		</div>
	)
}
