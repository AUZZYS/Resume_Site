import React, { useState } from 'react'
import { motion } from 'framer-motion'
import useFirestore from '../hooks/useFirestore'
import ProjectCard from '../comps/ProjectCard'
import { projectStorage, projectFireStore, timestamp } from '../firebase/config'
import { useAuthContext } from '../context/AuthContext'

const Projects = () => {
    const { docs } = useFirestore('projects')
    const { user } = useAuthContext()
    const [showForm, setShowForm] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [githubUrl, setGithubUrl] = useState('')
    const [file, setFile] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!file || !title) return
        setUploading(true)

        const storageRef = projectStorage.ref(`projects/${Date.now()}_${file.name}`)

        await new Promise((resolve, reject) => {
            storageRef.put(file).on('state_changed',
                (snap) => setUploadProgress((snap.bytesTransferred / snap.totalBytes) * 100),
                reject,
                resolve
            )
        })

        const clipUrl = await storageRef.getDownloadURL()
        await projectFireStore.collection('projects').add({
            title, description, githubUrl, clipUrl, createdAt: timestamp()
        })

        setTitle('')
        setDescription('')
        setGithubUrl('')
        setFile(null)
        setUploading(false)
        setUploadProgress(0)
        setShowForm(false)
    }

    return (
        <div className="projects-page">
            <div className="projects-header">
                <h2>Projects</h2>
                <div className="projects-header-actions">
                    <a href="https://github.com/YOUR_USERNAME" target="_blank" rel="noreferrer" className="github-profile-link">
                        GitHub Profile →
                    </a>
                    {user && (
                        <button className="toggle-form-btn" onClick={() => setShowForm(s => !s)}>
                            {showForm ? 'Cancel' : '+ Add Project'}
                        </button>
                    )}
                </div>
            </div>

            {showForm && (
                <form className="project-form" onSubmit={handleSubmit}>
                    <input
                        placeholder="Project title *"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Short description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input
                        placeholder="GitHub URL"
                        value={githubUrl}
                        onChange={e => setGithubUrl(e.target.value)}
                    />
                    <label className="clip-upload-label">
                        <input type="file" accept="video/mp4" onChange={e => setFile(e.target.files[0])} />
                        {file ? file.name : 'Choose MP4 clip *'}
                    </label>
                    {uploading && (
                        <motion.div className="progress-bar"
                            initial={{ width: 0 }}
                            animate={{ width: uploadProgress + '%' }}
                        />
                    )}
                    <button type="submit" disabled={uploading} className="submit-project-btn">
                        {uploading ? 'Uploading...' : 'Add Project'}
                    </button>
                </form>
            )}

            <div className="project-grid">
                {docs && docs.map(doc => (
                    <ProjectCard key={doc.id} doc={doc} />
                ))}
            </div>
        </div>
    )
}

export default Projects
