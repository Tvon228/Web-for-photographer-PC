export type Gallery = {
	id?: number
	name: string
	password: string
	client_message: string
	comment: string
}

export type Photo = {
	id: number
	uuid: string
	original_name: string
	uploaded_at: string
	extension: string
	file_path: string
}
