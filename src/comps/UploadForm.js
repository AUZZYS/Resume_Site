import React, { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import ProgressBar from './ProgressBar'

const UploadForm = () => {
    const [files, setFiles] = useState([])
    const [progresses, setProgresses] = useState({})
    const [error, setError] = useState(null)

    const types = ['image/png', 'image/jpeg']

    const overallProgress = files.length > 0
        ? files.reduce((sum, f) => sum + (progresses[f.name] || 0), 0) / files.length
        : 0

    const changeHandler = (e) => {
        const selected = Array.from(e.target.files)
        const valid = selected.filter(f => types.includes(f.type) || f.name.toLowerCase().endsWith('.nef'))
        if (valid.length === 0) {
            setError('Please select JPEG, PNG or NEF files')
        } else {
            setError(valid.length < selected.length ? 'Some files were skipped (only JPEG, PNG, NEF allowed)' : '')
            setFiles(prev => [...prev, ...valid])
        }
    }

    const removeFile = (file) => {
        setFiles(prev => prev.filter(f => f !== file))
        setProgresses(prev => { const next = { ...prev }; delete next[file.name]; return next })
    }

    const handleProgress = useCallback((file, value) => {
        setProgresses(prev => ({ ...prev, [file.name]: value }))
    }, [])

    return(
        <form>
            <label className="upload-btn">
                <input type="file" multiple onChange={changeHandler} />
                <span>+</span>
            </label>
            <div className="output">
                {error && <div className="error">{error}</div>}
                {files.length > 0 && (
                    <motion.div className="progress-bar"
                        initial={{ width: 0 }}
                        animate={{ width: overallProgress + '%' }}
                    />
                )}
                {files.map(file => (
                    <ProgressBar
                        key={file.name}
                        file={file}
                        onDone={() => removeFile(file)}
                        onProgress={(p) => handleProgress(file, p)}
                    />
                ))}
            </div>
        </form>
    )
}

export default UploadForm
