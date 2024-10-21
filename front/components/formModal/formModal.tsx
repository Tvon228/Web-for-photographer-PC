"use client"

import classes from "./formModal.module.sass"
import toast from "react-hot-toast"

import { useRef, useEffect, useState } from "react"
import { useUploadPhotoMutation } from "@/src/api"

import CloseButton from "../buttons/closeButton/closeButton"
import SaveButton from "@/components/buttons/saveButton/saveButton"
import useFormModal from "@/hooks/FormModal/useFormModal.hook"
import PhotoSide from "./photopage/photoPage"
import FileSide from "./filePage/filePage"
import { cssIf } from "@/utils/utils"

interface FormModalProps {
	galleryId: number
}

export default function FormModal({ galleryId }: FormModalProps) {
	const containerRef = useRef<HTMLDivElement>(null)
	const {opened, closeFormModalAction} = useFormModal()
	const [activeTab, setActiveTab] = useState("photo")
	const [uploadPhoto] = useUploadPhotoMutation()
	const [selectedPhotoList, setSelectedPhotoList] = useState<File[]>([])

	useEffect(() => {
		if (containerRef.current) {
			if (opened) {
				containerRef.current.style.removeProperty("z-index")
			} else {
				setTimeout(() => {
					// @ts-ignore
					containerRef.current.style.zIndex = "-1"
				}, 200)
			}
		}
	}, [opened])

	const uploadPhotoAction = async () => {
		try {
			for (let photo of selectedPhotoList) {
				await uploadPhoto({ galleryId, photo }).unwrap()
			}
			toast.success("Фото успешно загружены!")
		} catch (error) {
			toast.error("Ошибка при загрузке фото")
		}
	}
	
	const saveAction = async () => {
		if (selectedPhotoList.length > 0) {
			await uploadPhotoAction()
		}

		closeModalAction()
	}

	const closeModalAction = () => {
		setTimeout(() => {
			setSelectedPhotoList([])
		}, 200)
		closeFormModalAction()
	}

	const isPhotoTab = activeTab == "photo"
	const isArchiveTab = activeTab == "archive"
	const isEmptyPhotoList = selectedPhotoList.length == 0

	return (
		<div
			ref={containerRef}
			className={cssIf(opened, classes.container, classes.containerHidden)}
		>
			<div className={classes.content}>
				<div className={classes.header}>
					<span
						className={cssIf(isPhotoTab, classes.activeTab, classes.inactiveTab)}
						onClick={() => setActiveTab("photo")}
					>
						Фото
					</span>
					<span
						className={cssIf(isArchiveTab, classes.activeTab, classes.inactiveTab)}
						onClick={() => setActiveTab("archive")}
					>
						Архив
					</span>
				</div>

				<div className={classes.main}>
					{activeTab === "photo" 
						? 
						<PhotoSide opened={opened} photos={selectedPhotoList} setPhotoAction={setSelectedPhotoList} /> 
						: 
						<FileSide />
					}
				</div>
				<div className={classes.buttons}>
					<SaveButton
						onClick={saveAction}
						disabled={isEmptyPhotoList}
					/>
					<CloseButton onClick={closeModalAction} />
				</div>
			</div>
		</div>
	)
}
