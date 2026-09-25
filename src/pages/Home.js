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
                <p className="tagline">CS student. Systems thinker. Future SWE.</p>
            </section>

            <section className="about">
                <h2>About Me</h2>
                <p>
                    I am a Computer Science student at Rose-Hulman Institute of Technology (graduating May 2028) with a strong foundation in systems programming, algorithms, and software design. My project work includes a 5-stage pipelined RISC-V processor built in Verilog, cryptographic algorithm implementations in Python, including SHA-512, AES, and RSA from scratch, and a fully playable Java platformer built on an OOP framework.
                    I’m currently seeking software engineering internships where I can contribute to systems, pick up on industry tooling, and grow alongside experienced engineers. Outside of code, I serve as Secretary of Rose-Hulman's Climbing Club and set bouldering routes on campus.

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
