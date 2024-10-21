"use client"

import classes from "./formModal.module.sass"
import toast from "react-hot-toast"

import { useRef, useEffect, useState } from "react"
import { useUploadPhotoMutation } from "@/src/api"

import CloseButton from "../buttons/closeButton/closeButton"
import SaveButton from "@/components/buttons/saveButton/saveButton"
import useFormModal from "@/hooks/FormModal/useFormModal.hook"
import PhotoSide from "./photoSide/photoSide"
import FileSide from "./fileSide/fileSide"
import { usePhoto } from "@/hooks/FormModal/usePhoto.hook"

interface FormModalProps {
	galleryId: number
}

export default function FormModal({ galleryId }: FormModalProps) {
	const containerRef = useRef<HTMLDivElement>(null)
	const [isOpened, _, closeFormModal] = useFormModal()
	const [activeTab, setActiveTab] = useState("photo")
	const { fileNames, selectedFiles, clearFiles} = usePhoto()
	const [uploadPhoto] = useUploadPhotoMutation()

	// victor updates
	const [selectedPhoto, setSelectedPhoto] = useState<File[]>([])

	const setPhotoAction = (files: File[]) => {
		setSelectedPhoto(files)
	}
	// end victor updates

	const handleTabChange = (tab: string) => {
		setActiveTab(tab)
	}

	useEffect(() => {
		if (containerRef.current) {
			if (isOpened) {
				containerRef.current.style.removeProperty("z-index")
			} else {
				setTimeout(() => {
					// @ts-ignore
					containerRef.current.style.zIndex = "-1"
				}, 200)
			}
		}
	}, [isOpened])

	const handleUpload = async () => {
		console.log("start upload, selected files ", selectedPhoto)
		try {
			for (let i = 0; i < selectedPhoto.length; i++) {
				const file = selectedPhoto[i]
				//  (-_-)
				await uploadPhoto({ galleryId, photo: file }).unwrap() // Загружаем каждое фото
			}
			clearFiles() // Очищаем список файлов после загрузки
			closeFormModal() // Закрываем модал после загрузки
			toast.success("Фото успешно загружены!")
		} catch (error) {
			toast.error("Ошибка при загрузке фото")
		}
	}

	const handleSaveAndExit = () => {
		if (selectedPhoto.length > 0) {
			handleUpload() // Вызываем функцию загрузки
		} else {
			closeFormModal() // Просто закрываем, если нет файлов
		}
	}

	return (
		<div
			ref={containerRef}
			className={`${classes.container} ${
				!isOpened && classes.containerHidden
			}`}
		>
			<div className={classes.content}>
				<div className={classes.header}>
					<span
						className={
							activeTab === "photo"
								? classes.activeTab
								: classes.inactiveTab
						}
						onClick={() => handleTabChange("photo")}
					>
						Фото
					</span>
					<span
						className={
							activeTab === "archive"
								? classes.activeTab
								: classes.inactiveTab
						}
						onClick={() => handleTabChange("archive")}
					>
						Архив
					</span>
				</div>

				<div className={classes.main}>
					{activeTab === "photo" ? <PhotoSide photos={selectedPhoto} setPhotoAction={setPhotoAction} /> : <FileSide />}
				</div>
				<div className={classes.buttons}>
					<SaveButton
						onClick={handleSaveAndExit}
						disabled={selectedPhoto.length === 0}
					/>
					<CloseButton onClick={closeFormModal} />
				</div>
			</div>
		</div>
	)
}
