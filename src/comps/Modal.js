import React from "react";
import {motion} from 'framer-motion'

const Modal = ({ doc, setSelectedDoc }) => {
    return (
        <motion.div className="backdrop" onClick={() => setSelectedDoc(null)}
        
        initial = {{opacity : 0}}
        animate ={{opacity : 1}}       
        >
            <motion.img src={doc.url} alt="enlarged pic" 
                initial = {{y: "-100vh"}}
                animate = {{y:0}}
            
            
            />
        </motion.div>
    );
};

export default Modal;
