'use client'
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import ConvertApi from 'convertapi-js';
import toast, { Toaster } from 'react-hot-toast';
import { LuUploadCloud } from "react-icons/lu";


const convertApi = ConvertApi.auth({ token: process.env.NEXT_PUBLIC_TOKEN, apiKey: process.env.NEXT_PUBLIC_KEY });

const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [convertTo, setConvertTo] = useState('jpg');
  const [convertedFileUrl, setConvertedFileUrl] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const getFileExtension = (filename) => {
    return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
  };

  const uploadFiles = async () => {
    setUploading(true);
    setProgress(0);
    const toastId = toast.loading('Uploading file...');
    try {
      const file = files[0];
      const fileExtension = getFileExtension(file.name);
      const params = convertApi.createParams();
      params.add('file', file);
      // console.log(fileExtension)
      const result = await convertApi.convert(fileExtension, convertTo, params);

      const url = result.files[0].Url;
      setConvertedFileUrl(url);
      setProgress(100);
      toast.success('File converted successfully!', { id: toastId });
    } catch (error) {
      if ( error.Code === 4000 ) {
        toast.error('Unsupported document conversion', { id: toastId });
      } else {
        toast.error('Error uploading file. Please try again.', { id: toastId });
      }
      // console.error('Error uploading files:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-[79vh] flex flex-col items-center justify-center text-gray-800 p-4">
    <h1 className="text-3xl font-bold mb-6">File Upload</h1>
    <div
      {...getRootProps()}
      className="w-full max-w-lg p-6 border-2 border-dashed border-gray-300 bg-white rounded-lg text-center cursor-pointer hover:border-gray-400 flex flex-col justify-center items-center"
    >
      <input {...getInputProps()} />
      <LuUploadCloud size={50} />
      <span className="px-6 py-6">Drag & drop files here, or click to select files</span>
    </div>
    <div className="w-full max-w-lg mt-4">
      {files.length > 0 && (
        <div className="bg-green-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Files to Upload</h2>
          <ul>
            {files.map((file) => (
              <li key={file.path} className="mb-2">
                {file.path} - {file.size} bytes
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center">
            <button
              onClick={uploadFiles}
              disabled={uploading}
              className={`px-6 py-2 rounded-lg ${uploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
            >
              {uploading ? 'Uploading...' : 'Upload Files'}
            </button>
            <select
              value={convertTo}
              onChange={(e) => setConvertTo(e.target.value)}
              className="ml-4 px-2 py-2 border rounded-lg"
            >
              <option value="jpg">jpg</option>
              <option value="png">png</option>
              <option value="pdf">pdf</option>
              <option value="docx">docx</option>
              <option value="bmp">bmp</option>
              <option value="ico">ico</option>
              <option value="raw">raw</option>
              <option value="jpeg">jpeg</option>
              <option value="gif">gif</option>
              <option value="webp">webp</option>
              <option value="svg">svg</option>
            </select>
          </div>
          {uploading && (
            <div className="mt-4 w-full bg-gray-200 rounded-full overflow-hidden">
              <div
                className="bg-blue-600 text-xs leading-none py-1 text-center text-white rounded-full"
                style={{ width: `${progress}%` }}
              >
                {progress}%
              </div>
            </div>
          )}
          {convertedFileUrl && (
            <div className="mt-4">
              <p className="text-green-600">File converted successfully!
                <a
                  href={convertedFileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline ml-2 hover:text-blue-800"
                >
                  Download here
                </a>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  </div>
  );
};

export default FileUpload;
