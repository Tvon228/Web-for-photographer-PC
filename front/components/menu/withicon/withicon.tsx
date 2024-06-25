import classes from "./withicon.module.sass"

import { useState, useEffect, useRef } from "react"

import editIcon from "@/public/icons/edit.png"
import deleteIcon from "@/public/icons/delete.png"

import Image from "next/image"

import Menu from "../menu"

export default function Withicon() {

    const containerRef = useRef<HTMLDivElement>(null)

    const [isOpen, setIsOpen] = useState(false);

	const closeMenu = () => {
		setIsOpen(false)
	}

    useEffect(() => {
		if (isOpen)
			setTimeout(() => {
				window.addEventListener("click", closeMenu)
			}, 50)
		else 
			window.removeEventListener("click", closeMenu)
		return () => {
			window.removeEventListener("click", closeMenu)
		}
	}, [isOpen])

	const toggle = () => {
		setIsOpen(!isOpen);
	};

	useEffect(() => {
		if (!isOpen) {
			containerRef.current.style.removeProperty("z-index")
		} else {
			setTimeout(() => {
				containerRef.current.style.zIndex = "1"
			}, 5)
		}
	}, [!isOpen])	

    return (
        <div className={classes.controlWrapper} ref={containerRef}>
				<div className={classes.withmenu}>
					<div className={classes.edit_form}>
						<Image
							src={editIcon}
							alt="Edit"
							className={classes.controlIcon}
							onClick={toggle}
						/>
					</div>
					<div className={classes.menu + " " + (!isOpen && classes.menu_closed)}>
						<Menu/>
					</div>
				</div>
				<Image
					src={deleteIcon}
					alt="Delete"
					className={classes.controlIcon}
				/>
			</div>
    )
}