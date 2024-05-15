import { Gallery } from "@/types/entity.types"
import classes from "./List.module.sass"
import GalleryCard from "../cards/GalleryCard"
import { useGetGalleriesQuery } from "@/src/api"


function renderGalleries(list: Gallery[]) {
    return list.map(gallery => {
        return <GalleryCard key={gallery.id} gallery={gallery} />
    })
}

export default function GalleryList() {
    const {data: response, isLoading} = useGetGalleriesQuery()

    if (isLoading || !response) {
        return (
            <div className={classes.container}>
                pusto
            </div>
        )
    }

    return (
        <div className={classes.container}>
            { renderGalleries(response.data) }
        </div>
    )
}