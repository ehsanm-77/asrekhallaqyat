/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: '16px',
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: '8px',
  marginRight: '8px',
  width: '100px',
  height: '100px',
  padding: '4px',
  boxSizing: 'border-box',
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%',
};

function UploadImage({
  setValue,
  helperText,
  setImagePreview,
}: {
  setValue: any;
  helperText?: string;
  setImagePreview?: React.Dispatch<
    React.SetStateAction<{
      show: boolean;
      imgData: never[];
    }>
  >;
}) {
  const [files, setFiles] = useState<(any & { preview: string })[]>([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/png': ['.png'],
      'image/JPEG': ['.JPEG'],
    },
    onDrop: (acceptedFiles) => {
      const newFile = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setFiles(newFile);
      setValue('images', newFile);
      setImagePreview &&
        setImagePreview((prev) => {
          return {
            ...prev,
            show: false,
          };
        });
    },
  });

  const thumbs = files.map((file) => (
    <Box sx={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </Box>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <Box className="container">
      <Box
        {...getRootProps({ className: 'dropzone' })}
        sx={{
          border: '1px dashed gray',
          height: '100px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <input {...getInputProps()} />
        <Typography
          align="center"
          sx={{ color: 'gray', paddingTop: '18px', cursor: 'cell' }}
        >
          عکس را اینجا رها کنید
        </Typography>
        <Button fullWidth variant="contained">
          افزون عکس
        </Button>
      </Box>
      <Typography color="error" fontSize={'12px'}>
        {helperText}
      </Typography>
      <Box sx={thumbsContainer}>{thumbs}</Box>
    </Box>
  );
}

export default UploadImage;
