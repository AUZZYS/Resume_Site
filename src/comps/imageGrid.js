import React, { useState } from "react";
import useFirestore from '../hooks/useFirestore'
import { motion, AnimatePresence } from 'framer-motion'
import { projectFireStore, projectStorage } from '../firebase/config'
import { useAuthContext } from '../context/AuthContext'

const GridImage = ({ doc, user, onSelect, onDelete }) => {
    const [loaded, setLoaded] = useState(false)

    return (
        <motion.div className="img-wrap" onClick={() => onSelect(doc)}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            exit={{ opacity: 0 }}
            whileHover="hovered"
            variants={{ hovered: { opacity: 1 } }}
        >
            <motion.img src={doc.url} alt="uploaded pic"
                loading="lazy"
                decoding="async"
                onLoad={() => setLoaded(true)}
                initial={{ opacity: 0 }}
                animate={{ opacity: loaded ? 1 : 0 }}
                transition={{ duration: 0.35 }}
            />
            {user && (
                <motion.button
                    className="delete-btn"
                    variants={{ hovered: { opacity: 1 } }}
                    initial={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={(e) => onDelete(e, doc)}
                >✕</motion.button>
            )}
            {(doc.location || doc.dateTaken) && (
                <motion.div
                    className="img-info"
                    variants={{ hovered: { opacity: 1 } }}
                    initial={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {doc.location && <p>{doc.location}</p>}
                    {doc.dateTaken && <p>{new Date(doc.dateTaken).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })}</p>}
                </motion.div>
            )}
        </motion.div>
    )
}

const ImageGrid = ({ setSelectedDoc })=>{
    const {docs} = useFirestore('images')
    const { user } = useAuthContext()

    const handleDelete = async (e, doc) => {
        e.stopPropagation()
        await projectFireStore.collection('images').doc(doc.id).delete()
        await projectStorage.refFromURL(doc.url).delete()
    }

    return (
        <motion.div className="img-grid" layout>
            <AnimatePresence>
                {docs && docs.map(doc =>(
                    <GridImage
                        key={doc.id}
                        doc={doc}
                        user={user}
                        onSelect={setSelectedDoc}
                        onDelete={handleDelete}
                    />
                ))}
            </AnimatePresence>
        </motion.div>
    )
}


export default ImageGrid
