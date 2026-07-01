import { useEffect } from "react";
import useStorage from "../hooks/useStorage";

const ProgressBar = ({ file, onDone, onProgress }) => {
    const { url, progress } = useStorage(file)

    useEffect(() => { onProgress(progress) }, [progress]) // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => { if (url) onDone() }, [url, onDone])

    return null
}

export default ProgressBar
