export type Gallery = {
	id?: number
	name: string
	password: string
	client_message: string
	comment: string
}

export type Photo = {
	id: number
	nanoid_filename: string
	original_name: string
	uploaded_at: string
}
