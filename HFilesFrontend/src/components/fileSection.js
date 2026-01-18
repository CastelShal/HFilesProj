'use client'
import { useEffect, useState } from "react";

export default function FileSection({ renderSig }) {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [activeCard, setActiveCard] = useState(null);

    async function deleteFile() {
        if(!activeCard) return
        const id = activeCard;
        const resp = await fetch("http://localhost:5240/file_upload/" + id, {
            method: 'DELETE',
            credentials: 'include'
        });
        if (resp.status == 401) {
            window.location.href = "http://localhost:3000/login"
        }
        else if (resp.ok) {
            setActiveCard(null);
            setUploadedFiles(uploadedFiles.filter(file => file.documentId != id))
        }
    }

    function getPreviewUrl(){
        const base = "http://localhost:5240/uploads/";
        const file = uploadedFiles.find(card => card.documentId == activeCard)

        if(file.documentPath.endsWith('.pdf')){
            return "pdf_placeholder.webp";
        }
        else{
            return base + file.documentPath;
        }
    }

    function ViewFile() {
        if(!activeCard) return
        const fileLocation = "http://localhost:5240/uploads/" + uploadedFiles.find(card => card.documentId == activeCard).documentPath;

        window.open(fileLocation, '_blank');
    }

    useEffect(() => {
        async function loadFiles() {
            const resp = await fetch("http://localhost:5240/user/files", {
                method: 'GET',
                credentials: 'include'
            });
            if (resp.status == 401) {
                window.location.href = "http://localhost:3000/login"
            }
            else if (resp.ok) {
                const json = await resp.json();
                setUploadedFiles(json.documents);
                console.log(json.documents);
            }
        }

        loadFiles();
    }, [renderSig])
    return <div className="mt-8 border-t-2 border-gray-300 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex items-center justify-center h-70">
                    {!activeCard ? <p className="text-sm text-gray-500 transform -rotate-12">Preview of Sended file</p>
                        : <img
                            src={getPreviewUrl()}
                            className="h-full w-auto" />
                    }
                </div>
                <div className="mt-4 flex gap-2">
                    <button className="flex-1 bg-yellow-300 text-gray-800 font-medium py-2 rounded-lg disabled:opacity-55 disabled:cursor-not-allowed hover:bg-yellow-400 active:bg-yellow-500" onClick={ViewFile} disabled={!activeCard}>
                        View
                    </button>
                    <button className="flex-1 bg-blue-700 text-white font-medium py-2 rounded-lg disabled:cursor-not-allowed disabled:opacity-55 hover:bg-blue-800 active:bg-blue-900" onClick={deleteFile} disabled={!activeCard}>
                        Delete
                    </button>
                </div>
            </div>

            <div className="lg:col-span-2 flex items-center">
                <div className="w-full">
                    <div className="space-y-4">
                        {uploadedFiles.map(file => <FileCard key={file.documentId} id={file.documentId} name={file.documentName} type={file.documentType} />)}
                    </div>
                </div>
            </div>
        </div>
    </div >

    function FileCard({ id, name, type }) {
        return <div
            onClick={() => setActiveCard(id)}
            className={`border-2 rounded-lg p-4 bg-white cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 relative ${activeCard === 0 ? 'border-blue-700 shadow-md' : 'border-gray-300'}`}
        >
            {activeCard === id && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-blue-700 rounded-full flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            )}
            <div className="mb-3">
                <div className="text-xs font-medium text-gray-500 mb-1">
                    File Type
                </div>
                <div className="text-sm font-semibold text-gray-800">
                    {type}
                </div>
            </div>
            <div>
                <div className="text-xs font-medium text-gray-500 mb-1">
                    File Name
                </div>
                <div className="text-sm font-semibold text-gray-800">
                    {name}
                </div>
            </div>
        </div>;
    }
}