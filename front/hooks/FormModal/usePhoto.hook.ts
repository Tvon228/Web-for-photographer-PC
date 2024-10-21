import { useDispatch, useSelector } from "react-redux"
import {
	addPhoto,
	clearPhotos,
	removePhoto as removePhotoFromStore,
} from "@/src/slice/photoSlice"
import { useState } from "react"

export const usePhoto = () => {
	const dispatch = useDispatch()
	const { fileNames } = useSelector(
		(state: {
			photo: {
				fileNames: Array<{ name: string; size: number; type: string }>
			}
		}) => state.photo
	)
	const [selectedFiles, setSelectedFiles] = useState<File[]>([]) // Локальное состояние для файлов

	const addPhotoHandler = (file: File) => {
		setSelectedFiles((prev) => [...prev, file]) // Сохраняем файл в локальное состояние
		const photoData = {
			name: file.name,
			size: file.size,
			type: file.type,
		}
		dispatch(addPhoto(photoData)) // Сохраняем только метаданные
	}

	const removePhoto = (file: File) => {
		setSelectedFiles((prev) => prev.filter((f) => f.name !== file.name)) // Удаляем файл из локального состояния
		dispatch(removePhotoFromStore({ name: file.name })) // Удаляем из Redux
	}

	const clearFiles = () => {
		setSelectedFiles([]) // Очищаем локальное состояние
		dispatch(clearPhotos())
	}

	return {
		fileNames,
		selectedFiles,
		addPhoto: addPhotoHandler,
		removePhoto,
		clearFiles,
	}
}
