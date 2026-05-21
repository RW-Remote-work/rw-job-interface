import { useState } from 'react';
import { SingleDragUpload, UploadFile } from './../SingleDragUpload'


export const UploadExamples = () => {
    const [file, setFile] = useState<UploadFile>();


    return (
        <SingleDragUpload uploadFile={file} onChange={setFile} onDelete={() => setFile(undefined)} />
    )

} 