"use client"

import SettingIcon from "@/public/icons/setting.png"
import ImageIcon from "@/public/icons/image.png"
import PriceIcon from "@/public/icons/price.png"


import classes from "./menu.module.sass"
import Image from "next/image"

export default function Menu() {

    return (
        <div className={classes.container}>
            <div className={classes.content}>
                <div className={classes.form}>
                    <div className={classes.form_item}>
                        <Image
                                src={SettingIcon}
                                alt="Edit"
                                className={classes.controlIcon}
                        />  
                        <div className={classes.form_label}>Редактирование галереи</div>
                    </div>
                    <div className={classes.form_item}>
                        <Image
                            src={ImageIcon}
                            alt="Edit"
                            className={classes.controlIcon}
                        />  
                    <div className={classes.form_label}>Фотографии галереи</div>
                    </div>
                    <div className={classes.form_item}>
                            <Image
                                src={PriceIcon}
                                alt="Edit"
                                className={classes.controlIcon}
                            />  
                        <div className={classes.form_label}>Редактирование цены</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
