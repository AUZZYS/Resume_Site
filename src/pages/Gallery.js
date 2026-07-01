import React, { useState } from 'react'
import UploadForm from '../comps/UploadForm'
import ImageGrid from '../comps/imageGrid'
import Modal from '../comps/Modal'

const Gallery = () => {
    const [selectedDoc, setSelectedDoc] = useState(null)

    return (
        <div className="gallery-page">
            <h2>Gallery</h2>
            <p>A collection of my pictures over the years.</p>
            <UploadForm />
            <ImageGrid setSelectedDoc={setSelectedDoc} />
            {selectedDoc && <Modal doc={selectedDoc} setSelectedDoc={setSelectedDoc} />}
        </div>
    )
}

export default Gallery
