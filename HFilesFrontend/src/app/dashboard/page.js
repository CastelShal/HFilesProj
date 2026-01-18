'use client'
import FileSection from "@/components/fileSection.js";
import ProfileSection from "@/components/profileSection.js";
import RecordsUploadSection from "@/components/recordsSection.js";
import { useEffect, useState } from "react";

export default function Page() {
    const [fileRender, setFileRender] = useState(0);
    function fileRerender(){
        setFileRender(fileRender + 1)
    }
    
    return <div className="min-h-screen bg-gray-50 text-black">
        <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Section - Profile Card */}
                <ProfileSection />

                {/* Right Section - Add Medical Records */}
                <RecordsUploadSection rerenderFiles={fileRerender}/>
            </div>

            {/* Bottom Section - File Preview */}
            <FileSection renderSig={fileRender}/>
        </div>
    </div>
}