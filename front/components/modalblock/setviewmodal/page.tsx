"use client"

import { useState } from "react"

import classes from "./gallery.module.sass"

import Image from "next/image"
import searchIcon from "@/public/icons/search.png"

import AddButton from "@/components/buttons/AddButton"
import GalleryList from "@/components/lists/GalleryList"


export default function Gallery() {
	const [searchQuery, setSearchQuery] = useState("")

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(event.target.value)
	}

	return (
		<div className={classes.container}>
			<div className={classes.header}>Галереи</div>
			<div className={classes.top_bar}>
				<div className={classes.search}>
					<input
						type="text"
						placeholder="Поиск"
						value={searchQuery}
						onChange={handleSearchChange}
					/>
					<button type="submit">
						<Image
							src={searchIcon}
							alt="search"
							className={classes.controlIcon}
						/>
					</button>
				</div>
				<div>
					<AddButton />
				</div>
			</div>
			<GalleryList searchQuery={searchQuery} />
		</div>
	)
}
