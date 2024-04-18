import { Gallery } from "@/types/entity.types"
import classes from "./List.module.sass"
import GalleryCard from "../cards/GalleryCard"

const mockGalleries: Gallery[] = [
    {
        id: 1,
        status: true
    },
    {
        id: 2,
        status: false
    },
    {
        id: 3,
        status: true
    }
]

function renderGalleries(list: Gallery[]) {
    return list.map(gallery => {
        return <GalleryCard key={gallery.id} gallery={gallery} />
    })
}

export default function GalleryList() {
    return (
        <div className={classes.container}>
            { renderGalleries(mockGalleries) }
        </div>
    )
}