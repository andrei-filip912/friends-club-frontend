import { Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Image from "next/image";
import IconButton from "@mui/material/IconButton";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Alert from "@mui/material/Alert";

const BITS_IN_MB = 1024;
const LIMIT = 5000;

interface DropzoneProps {
  defaultStyle: string;
  activatedStyle: string;
  files: FileWithPreview[];
  setFiles: (value: FileWithPreview[]) => void;
  rejectedFiles: FileRejection[];
  setRejectedFiles: (value: FileRejection[]) => void;
}

interface FileWithPreview extends File {
  preview: string;
}

const Dropzone = ({
  defaultStyle,
  activatedStyle,
  files,
  setFiles,
  rejectedFiles,
  setRejectedFiles,
}: DropzoneProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      setRejectedFiles([]);
      if (acceptedFiles?.length) {
        // @ts-ignore
        //////////////////////////////////////  MULTI FILE UPDATE
        // setFiles((previousFiles) => [
        //   ...previousFiles,
        //   ...acceptedFiles.map((file) =>
        //     Object.assign(file, { preview: URL.createObjectURL(file) })
        //   ),
        // ]);
        
        setFiles([
          ...acceptedFiles.map((file) =>
            Object.assign(file, { preview: URL.createObjectURL(file) })
          ),
        ]);
      }
      
      if (rejectedFiles?.length) {
        // @ts-ignore
        setRejectedFiles((previousFiles) => [
          ...previousFiles,
          ...rejectedFiles,
        ]);
      }
    },
    [setFiles, setRejectedFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
    },
    maxSize: BITS_IN_MB * LIMIT,
  });

  const removeFile = (name: string) => {
     // @ts-ignore
    setFiles((files) => files.filter((file) => file.name != name));
  };

  return (
    <form>
      {/* Rejected files */}
      {rejectedFiles.length > 0 ? (
        <Alert severity="error" sx={{ marginTop: "1%" }}>
          {rejectedFiles.map((rejectedFile) => {
            const { file, errors } = rejectedFile;
            const errorCodes = errors.map((error) => `${error.code}, `);
            return (
              <p key={file.name}>
                <strong>{file.name}</strong>: {errorCodes}
              </p>
            );
          })}
        </Alert>
      ) : (
        <></>
      )}

      {/* Drop area */}
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className={isDragActive ? activatedStyle : defaultStyle}>
          <Typography>Drag&apos;n drop, or click to select an image</Typography>
        </div>
      </div>

      {/* Preview */}
      {files.length > 0 ? (
        <ImageList
          sx={{
            width: 550,
            height: 150,
          }}
          rowHeight={200}
          gap={1}
        >
          {files.map((file) => {
            return (
              <ImageListItem key={file.preview}>
                <Image
                  src={file.preview}
                  height={150}
                  width={200}
                  alt={file.name}
                  onLoad={() => {
                    URL.revokeObjectURL(file.preview);
                  }}
                />
                <ImageListItemBar
                  sx={{
                    background: "none",
                    paddingRight: 4,
                  }}
                  position="top"
                  actionPosition="right"
                  actionIcon={
                    <IconButton
                      sx={{
                        color: "black",
                        backgroundColor: "white",
                        width: "25px",
                        height: "25px",
                        "&:hover": {
                          backgroundColor: "white",
                          color: "#bf0f2a",
                        },
                      }}
                      onClick={() => removeFile(file.name)}
                    >
                      <HighlightOffIcon />
                    </IconButton>
                  }
                />
              </ImageListItem>
            );
          })}
        </ImageList>
      ) : (
        <></>
      )}
    </form>
  );
};

export default Dropzone;
