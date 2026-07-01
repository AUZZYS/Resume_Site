import React from "react";
import useFirestore from '../hooks/useFirestore'
import { motion, AnimatePresence } from 'framer-motion'
import { projectFireStore, projectStorage } from '../firebase/config'
import { useAuthContext } from '../context/AuthContext'

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
                    <motion.div className="img-wrap" key={doc.id} onClick={() => setSelectedDoc(doc)}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.85 }}
                        exit={{ opacity: 0 }}
                        whileHover="hovered"
                        variants={{ hovered: { opacity: 1 } }}
                    >
                        <motion.img src={doc.url} alt="uploaded pic"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        />
                        {user && (
                            <motion.button
                                className="delete-btn"
                                variants={{ hovered: { opacity: 1 } }}
                                initial={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                onClick={(e) => handleDelete(e, doc)}
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
                ))}
            </AnimatePresence>
        </motion.div>
    )
}


export default ImageGrid