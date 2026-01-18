'use client'

function RecordsUploadSection({rerenderFiles}) {
    async function uploadFile(formData){
        const resp = await fetch("http://localhost:5240/file_upload", {
                method: 'POST',
                credentials: 'include',
                body: formData
            });
            if(resp.status == 401){
                window.location.href = "http://localhost:3000/login"
            }
            else if(resp.status == 201){
                alert("Created")
                rerenderFiles();
            }
            else{
                alert("Problem with submitting form");
            }
    }

    const handleSubmitFile = async (ev) => {
        ev.preventDefault();
        console.log(ev.target);
        const formData = new FormData(ev.target);
        await uploadFile(formData);
        ev.target.reset();
    };


    return (
        <form onSubmit={handleSubmitFile} className="flex flex-col gap-6">
            <div>
                <h2 className="text-xl font-semibold text-blue-700 mb-6 text-center">
                    Please Add Your Medical Records
                </h2>

                <div className="space-y-4">
                    <div>
                        <label htmlFor="fileName" className="block text-sm font-medium text-gray-700 mb-2">
                            File Name
                        </label>
                        <input
                            required
                            id="fileName"
                            name="documentName"
                            type="text"
                            placeholder="Enter Name of File"
                            pattern="^[\dA-Za-z ]+$"
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="fileType" className="block text-sm font-medium text-gray-700 mb-2">
                            File Type
                        </label>
                        <div className="relative">
                            <select
                                required
                                id="fileType"
                                name="documentType"
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none appearance-none bg-white cursor-pointer"
                            >
                                <option value="Lab Report">Lab Report</option>
                                <option value="Medical Prescription">Medical Prescription</option>
                                <option value="X-Ray">X-Ray</option>
                                <option value="MRI">MRI</option>
                                <option value="Other">Other</option>
                            </select>
                            <span className="absolute right-3 top-3.5 pointer-events-none">
                                ▼
                            </span>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="fileUpload" className="block text-sm font-medium text-gray-700 mb-2">
                            Upload File (Images or PDF only)
                        </label>
                        <input
                            required
                            id="fileUpload"
                            name="document"
                            type="file"
                            accept="image/*,.pdf"
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex gap-4">
                        <button
                            type="submit"
                            className="px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default RecordsUploadSection;