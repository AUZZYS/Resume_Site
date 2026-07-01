import React, { useRef } from 'react'
import { projectFireStore, projectStorage } from '../firebase/config'
import { useAuthContext } from '../context/AuthContext'

const ProjectCard = ({ doc }) => {
    const videoRef = useRef(null)
    const { user } = useAuthContext()

    const handleDelete = async () => {
        await projectFireStore.collection('projects').doc(doc.id).delete()
        await projectStorage.refFromURL(doc.clipUrl).delete()
    }

    return (
        <div className="project-card">
            <div className="project-video-wrap"
                onMouseEnter={() => videoRef.current?.play()}
                onMouseLeave={() => { videoRef.current?.pause(); videoRef.current.currentTime = 0 }}
            >
                <video ref={videoRef} src={doc.clipUrl} muted loop playsInline />
            </div>
            <div className="project-info">
                <h3>{doc.title}</h3>
                {doc.description && <p>{doc.description}</p>}
                <div className="project-links">
                    {doc.githubUrl && (
                        <a href={doc.githubUrl} target="_blank" rel="noreferrer" className="project-github-link">
                            View on GitHub →
                        </a>
                    )}
                    {user && (
                        <button className="project-delete-btn" onClick={handleDelete}>Delete</button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProjectCard
