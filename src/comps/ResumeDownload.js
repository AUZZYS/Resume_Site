import React, { useState } from 'react'
import { motion } from 'framer-motion'

const ResumeDownload = ({ url, fileName = 'Ollie_Shearing_Resume.pdf' }) => {
    const [status, setStatus] = useState('idle') // idle | downloading | done

    const handleClick = async () => {
        if (status === 'downloading') return
        setStatus('downloading')

        try {
            const res = await fetch(url)
            const blob = await res.blob()
            const blobUrl = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = blobUrl
            link.download = fileName
            document.body.appendChild(link)
            link.click()
            link.remove()
            URL.revokeObjectURL(blobUrl)
            setStatus('done')
        } catch (e) {
            window.open(url, '_blank')
            setStatus('idle')
        } finally {
            setTimeout(() => setStatus('idle'), 1000)
        }
    }

    return (
        <button type="button" className="resume-paper-btn" onClick={handleClick}>
            <motion.div
                className="resume-paper-float"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            >
                <motion.div
                    className="resume-paper-hover"
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                >
                    <div className="resume-paper">
                        <span className="resume-paper-fold" />
                        <span className="resume-paper-line" />
                        <span className="resume-paper-line" />
                        <span className="resume-paper-line short" />
                    </div>
                </motion.div>
            </motion.div>
            <span className="resume-paper-label">
                {status === 'downloading' ? 'Downloading…' : status === 'done' ? 'Downloaded ✓' : 'Download Resume'}
            </span>
        </button>
    )
}

export default ResumeDownload
