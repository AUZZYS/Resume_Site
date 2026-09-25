import { useEffect } from "react";
import useStorage from "../hooks/useStorage";

const ProgressBar = ({ file, onDone, onProgress, onError }) => {
    const { url, progress, error } = useStorage(file)

    useEffect(() => { onProgress(progress) }, [progress]) // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => { if (url) onDone() }, [url, onDone])
    useEffect(() => { if (error) onError(error) }, [error]) // eslint-disable-line react-hooks/exhaustive-deps

    return null
}

export default ProgressBar
