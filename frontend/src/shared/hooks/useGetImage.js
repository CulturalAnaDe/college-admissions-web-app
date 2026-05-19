import { getDocumentImage } from '@/entities/applicant'
import { useEffect, useState } from 'react'

export const useGetImage = arr => {
	const [photoUser, setPhotoUser] = useState('/default-photo.jpg')

	useEffect(() => {
		const loadImage = async () => {
			const image = arr?.Documents?.find(doc => doc.type === 'photo')

			if (!image) return

			const url = await getDocumentImage(image.id)
			setPhotoUser(url)
		}

		loadImage()
	}, [arr])

	return { photoUser }
}
