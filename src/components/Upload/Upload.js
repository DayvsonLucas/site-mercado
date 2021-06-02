import React, { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useSnackbar } from 'notistack';
import Camera from '../../assets/upload-image.svg';

const variant = "info"

function Upload({ files, setFiles, maxSize }) {
  const { enqueueSnackbar } = useSnackbar();

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg, image/png',
    onDrop: acceptedFiles => {

      acceptedFiles.map(file => {
        if (file.size > 2097152) {
          enqueueSnackbar('Imagem muito grande. selecione uma imagem com tamanho ate 2 MB', { variant });

        } else {
          if (files.length > 1) {
            enqueueSnackbar('Máximo 1 arquivos', { variant });
          }
          else {

            //let count = files.length + acceptedFiles.length

            files = []
            var filesConcat = files.concat(acceptedFiles.map(file => Object.assign(file, {
              preview: URL.createObjectURL(file)
            })))

            setFiles(filesConcat);

            // if (count > 1) {
            //   enqueueSnackbar('Máximo 1 arquivos', { variant });
            // }
            // else {
            //   var filesConcat = files.concat(acceptedFiles.map(file => Object.assign(file, {
            //     preview: URL.createObjectURL(file)
            //   })))

            //   setFiles(filesConcat);
            // }
          }
        }
      })
    }

  });

  useEffect(() => () => {
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <img src={Camera} alt="Camera" width="150" height="150" style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'block',
        }} />
        <p style={{
          fontSize: 12,
          textAlign: 'center',
          marginTop: 8
        }}>
          Arraste e solte alguns arquivos aqui, ou clique para selecionar arquivos (Máximo 1 imagem)
       </p>
      </div>
    </section>
  );
}

export default Upload
