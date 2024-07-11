import classes from "./withicon.module.sass"
import editIcon from "@/public/icons/edit.png"

import { useState, useEffect, useRef } from "react"

import Image from "next/image"
import Menu from "../openmodal/menu"

export default function Withicon( ) {

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
			<div className={classes.withmenu} ref={containerRef}>
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
    )
}