import { useState } from "react";
import exampleImage from "figma:asset/85be2cfe257dcafec0fb0e9a12483212e706b21d.png";

export default function App() {
  const [email, setEmail] = useState("xyz@gmail.com");
  const [phone, setPhone] = useState("9685746987");
  const [gender, setGender] = useState("Male");
  const [fileType, setFileType] = useState("");
  const [fileName, setFileName] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<
    Array<{ name: string; type: string }>
  >([]);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const handleSaveProfile = () => {
    alert("Profile saved successfully!");
  };

  const handleSubmitFile = () => {
    if (fileType && fileName) {
      setUploadedFiles([
        ...uploadedFiles,
        { name: fileName, type: fileType },
      ]);
      setFileType("");
      setFileName("");
      alert("File uploaded successfully!");
    } else {
      alert("Please fill in all fields");
    }
  };

  const handleDeleteFile = (index: number) => {
    setUploadedFiles(
      uploadedFiles.filter((_, i) => i !== index),
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <span className="text-2xl font-bold">hfiles</span>
            <div className="w-6 h-6 border-2 border-white rounded flex items-center justify-center">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
              >
                <path d="M2 2H10V10H2V2Z" fill="white" />
                <path
                  d="M4 4V8M8 4V8"
                  stroke="#1E40AF"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="text-xs tracking-wider">
          HEALTH FILES
        </div>
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
          <img
            src={exampleImage}
            alt="User"
            className="w-full h-full object-cover"
          />
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 min-[870px]:grid-cols-2 gap-8">
          {/* Left Section - Profile Card */}
          <div className="flex flex-col gap-6">
            <div className="bg-blue-50 rounded-2xl p-8 border-2 border-blue-200 relative">
              <div className="absolute top-6 right-6 text-sm font-semibold text-gray-700">
                FH54J7CV76B
              </div>

              <div className="flex flex-col items-center gap-4 mb-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <img
                      src={exampleImage}
                      alt="Ankit k."
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white px-4 py-1 rounded-full text-xs font-medium text-gray-700 shadow-md hover:bg-gray-50 transition-colors">
                    Change
                  </button>
                </div>
                <h2 className="text-xl font-semibold text-blue-700">
                  Ankit k.
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email :
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone :
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender :
                  </label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={gender === "Male"}
                        onChange={(e) =>
                          setGender(e.target.value)
                        }
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-sm text-gray-700">
                        Male
                      </span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={gender === "Female"}
                        onChange={(e) =>
                          setGender(e.target.value)
                        }
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-sm text-gray-700">
                        Female
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleSaveProfile}
                  className="bg-yellow-300 hover:bg-yellow-400 text-gray-800 font-medium px-8 py-2 rounded-lg transition-colors shadow-md"
                >
                  Save
                </button>
              </div>
            </div>
          </div>

          {/* Right Section - Add Medical Records */}
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-xl font-semibold text-blue-700 mb-6 text-center">
                Please Add Your Medical Records
              </h2>

              <div className="space-y-4">
                <select
                  value={fileType}
                  onChange={(e) => setFileType(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 1rem center",
                    backgroundSize: "12px",
                  }}
                >
                  <option value="">Select file type</option>
                  <option value="Lab Report">Lab Report</option>
                  <option value="Medical Prescription">
                    Medical Prescription
                  </option>
                  <option value="X-Ray">X-Ray</option>
                  <option value="MRI">MRI</option>
                  <option value="Other">Other</option>
                </select>

                <input
                  type="text"
                  placeholder="Enter Name of File . . ."
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="flex gap-4">
                  <button className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700">
                    Select file
                  </button>
                  <button
                    onClick={handleSubmitFile}
                    className="px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg transition-colors"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - File Preview */}
        <div className="mt-8 border-t-2 border-gray-300 pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              {uploadedFiles.length > 0 ? (
                <div className="space-y-4">
                  {uploadedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="border-2 border-gray-300 rounded-lg p-6 bg-white"
                    >
                      <div className="mb-4">
                        <div className="text-sm font-medium text-gray-700 mb-1">
                          Type: {file.type}
                        </div>
                        <div className="text-sm text-gray-600">
                          Name: {file.name}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 bg-yellow-300 hover:bg-yellow-400 text-gray-800 font-medium py-2 rounded-lg transition-colors">
                          View
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteFile(index)
                          }
                          className="flex-1 bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 rounded-lg transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex items-center justify-center h-40">
                  <p className="text-sm text-gray-500 transform -rotate-12">
                    Preview of Sended file
                  </p>
                </div>
              )}

              {uploadedFiles.length === 0 && (
                <div className="mt-4 flex gap-2">
                  <button className="flex-1 bg-yellow-300 text-gray-800 font-medium py-2 rounded-lg opacity-50 cursor-not-allowed">
                    View
                  </button>
                  <button className="flex-1 bg-blue-700 text-white font-medium py-2 rounded-lg opacity-50 cursor-not-allowed">
                    Delete
                  </button>
                </div>
              )}
            </div>

            <div className="lg:col-span-2 flex items-center">
              <div className="w-full">
                <div className="space-y-4">
                  {/* Dummy File 1 */}
                  <div 
                    onClick={() => setActiveCard(0)}
                    className={`border-2 rounded-lg p-4 bg-white cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 relative ${
                      activeCard === 0 ? 'border-blue-700 shadow-md' : 'border-gray-300'
                    }`}
                  >
                    {activeCard === 0 && (
                      <div className="absolute top-2 right-2 w-5 h-5 bg-blue-700 rounded-full flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    )}
                    <div className="mb-3">
                      <div className="text-xs font-medium text-gray-500 mb-1">
                        File Type
                      </div>
                      <div className="text-sm font-semibold text-gray-800">
                        Lab Report
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-gray-500 mb-1">
                        File Name
                      </div>
                      <div className="text-sm font-semibold text-gray-800">
                        Blood_Test_Results_2024.pdf
                      </div>
                    </div>
                  </div>

                  {/* Dummy File 2 */}
                  <div 
                    onClick={() => setActiveCard(1)}
                    className={`border-2 rounded-lg p-4 bg-white cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 relative ${
                      activeCard === 1 ? 'border-blue-700 shadow-md' : 'border-gray-300'
                    }`}
                  >
                    {activeCard === 1 && (
                      <div className="absolute top-2 right-2 w-5 h-5 bg-blue-700 rounded-full flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    )}
                    <div className="mb-3">
                      <div className="text-xs font-medium text-gray-500 mb-1">
                        File Type
                      </div>
                      <div className="text-sm font-semibold text-gray-800">
                        Medical Prescription
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-gray-500 mb-1">
                        File Name
                      </div>
                      <div className="text-sm font-semibold text-gray-800">
                        Dr_Smith_Prescription.pdf
                      </div>
                    </div>
                  </div>

                  {/* Dummy File 3 */}
                  <div 
                    onClick={() => setActiveCard(2)}
                    className={`border-2 rounded-lg p-4 bg-white cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 relative ${
                      activeCard === 2 ? 'border-blue-700 shadow-md' : 'border-gray-300'
                    }`}
                  >
                    {activeCard === 2 && (
                      <div className="absolute top-2 right-2 w-5 h-5 bg-blue-700 rounded-full flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    )}
                    <div className="mb-3">
                      <div className="text-xs font-medium text-gray-500 mb-1">
                        File Type
                      </div>
                      <div className="text-sm font-semibold text-gray-800">
                        X-Ray
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-gray-500 mb-1">
                        File Name
                      </div>
                      <div className="text-sm font-semibold text-gray-800">
                        Chest_XRay_Jan2024.jpg
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}