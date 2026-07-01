import React, { useState } from 'react'
import UploadForm from '../comps/UploadForm'
import ImageGrid from '../comps/imageGrid'
import Modal from '../comps/Modal'
import { useAuthContext } from '../context/AuthContext'

const Gallery = () => {
    const [selectedDoc, setSelectedDoc] = useState(null)
    const { user } = useAuthContext()

    return (
        <div className="gallery-page">
            <h2>Gallery</h2>
            <p>A collection of my pictures over the years.</p>
            {user && <UploadForm />}
            <ImageGrid setSelectedDoc={setSelectedDoc} />
            {selectedDoc && <Modal doc={selectedDoc} setSelectedDoc={setSelectedDoc} />}
        </div>
    )
}

export default Gallery
