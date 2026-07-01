import React, { useState, useEffect } from 'react'
import { projectStorage } from '../firebase/config'
import { useAuthContext } from '../context/AuthContext'

const Home = () => {
    const [resumeUrl, setResumeUrl] = useState(null)
    const [uploading, setUploading] = useState(false)
    const { user } = useAuthContext()

    useEffect(() => {
        projectStorage.ref('resume/resume.pdf').getDownloadURL()
            .then(setResumeUrl)
            .catch(() => {})
    }, [])

    const handleResumeUpload = async (e) => {
        const file = e.target.files[0]
        if (!file || file.type !== 'application/pdf') return
        setUploading(true)
        const ref = projectStorage.ref('resume/resume.pdf')
        await ref.put(file)
        const url = await ref.getDownloadURL()
        setResumeUrl(url)
        setUploading(false)
    }

    return (
        <div className="home-page">
            <section className="hero">
                <h1>Ollie Shearing</h1>
                <p className="tagline">Your tagline here</p>
            </section>

            <section className="about">
                <h2>About Me</h2>
                <p>
                    Write your bio here. Tell visitors who you are, what you do,
                    and what you're passionate about.
                </p>
            </section>

            <section className="contact">
                <h2>Contact</h2>
                <div className="contact-links">
                    <a href="mailto:shearioj@rose-hulman.edu" className="contact-link">Email</a>
                    <a href="https://github.com/AUZZYS" target="_blank" rel="noreferrer" className="contact-link">GitHub</a>
                    <a href="https://linkedin.com/in/ollie-shearing-62b7752a1" target="_blank" rel="noreferrer" className="contact-link">LinkedIn</a>
                </div>
            </section>

            <section className="resume-section">
                <h2>Resume</h2>
                <div className="resume-actions">
                    {resumeUrl && (
                        <a href={resumeUrl} target="_blank" rel="noreferrer" className="resume-download-btn">
                            Download Resume
                        </a>
                    )}
                    {user && (
                        <label className="resume-upload-btn">
                            {uploading ? 'Uploading...' : resumeUrl ? 'Update Resume' : 'Upload Resume'}
                            <input type="file" accept=".pdf" onChange={handleResumeUpload} />
                        </label>
                    )}
                </div>
                {!resumeUrl && !uploading && (
                    <p className="resume-hint">No resume uploaded yet.</p>
                )}
            </section>
        </div>
    )
}

export default Home
