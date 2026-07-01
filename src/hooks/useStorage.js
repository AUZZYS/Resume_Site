import {useState, useEffect} from 'react'
import {projectStorage, projectFireStore, timestamp} from '../firebase/config'
import exifr from 'exifr'

const useStorage = (file) => {
    const [progress, setProgress] = useState(0)
    const [error, setError] = useState(null)
    const [url, setUrl] = useState(null)

    useEffect(() => {
        const run = async () => {
            let uploadFile = file

            if (file.name.toLowerCase().endsWith('.nef')) {
                try {
                    const previewData = await exifr.preview(file) || await exifr.thumbnail(file)
                    if (previewData) {
                        const jpegName = file.name.replace(/\.nef$/i, '.jpg')
                        uploadFile = new File([previewData], jpegName, { type: 'image/jpeg' })
                    }
                } catch (e) { /* fall back to original */ }
            }

            const storageRef = projectStorage.ref(uploadFile.name)
            const collectionRef = projectFireStore.collection('images')

            storageRef.put(uploadFile).on('state_changed', (snap) => {
                let percentage = (snap.bytesTransferred / snap.totalBytes) * 100
                setProgress(percentage)
            }, (err) => {
                setError(err)
            }, async () => {
                const url = await storageRef.getDownloadURL()
                const createdAt = timestamp()

                let location = null
                let dateTaken = null

                try {
                    const exif = await exifr.parse(file, { gps: true, pick: ['DateTimeOriginal'] })
                    if (exif) {
                        if (exif.DateTimeOriginal) {
                            dateTaken = exif.DateTimeOriginal.toISOString()
                        }
                        if (exif.latitude && exif.longitude) {
                            const res = await fetch(
                                `https://nominatim.openstreetmap.org/reverse?lat=${exif.latitude}&lon=${exif.longitude}&format=json`
                            )
                            const data = await res.json()
                            const { city, town, village, country } = data.address || {}
                            location = [city || town || village, country].filter(Boolean).join(', ')
                        }
                    }
                } catch (e) {
                    // no EXIF data available, continue without
                }

                collectionRef.add({ url, createdAt, ...(location && { location }), ...(dateTaken && { dateTaken }) })
                setUrl(url)
            })
        }

        run()
    }, [file])

    return {progress, url, error}
}

export default useStorage
