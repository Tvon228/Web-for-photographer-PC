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
	const { data: response, isLoading, refetch } = useGetGalleriesQuery()
	const [deleteGallery] = useDeleteGalleryMutation()

	const handleDelete = async (id: number) => {
		try {
			await deleteGallery(id).unwrap()
			refetch()
		} catch (error) {
			console.error("Ошибка удаления галереи:", error)
		}
	}

	if (isLoading || !response) {
		return <div className={classes.container}>Загрузка...</div>
	}

	const filteredGalleries = response.data.filter((gallery) =>
		gallery.name.toLowerCase().startsWith(searchQuery.toLowerCase())
	)

	return (
		<div className={classes.container}>
			{filteredGalleries.length > 0 ? (
				renderGalleries(filteredGalleries, handleDelete)
			) : (
				<div>Нет результатов</div>
			)}
		</div>
	)
}
