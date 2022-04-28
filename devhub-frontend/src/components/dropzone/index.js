import React, { useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { CSSTransition } from 'react-transition-group';
import emptyRepository from '../../assets/images/repository-empty.svg';

const activeStyle = {
  borderColor: '#2196f3',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

export const Dropzone = (props) => {
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone();

  const [files, setFiles] = useState([]);

  const handleFiles = ({ file }) => {
    props.onFiles(
      files.filter((item) => {
        return item.name !== file.name;
      })
    );
    setFiles(
      files.filter((item) => {
        return item.name !== file.name;
      })
    );
  };

  const style = useMemo(
    () => ({
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  useEffect(() => {
    setFiles(acceptedFiles);
    props.onFiles(acceptedFiles);
  }, [setFiles, acceptedFiles, props]);

  return (
    <div className="drodzone-container">
      <div {...getRootProps({ className: `drodzone`, style })}>
        <input {...getInputProps()} />
        <h3>Tu repositorio está vacío. </h3>
        <img src={emptyRepository} alt="empty" />
        <p>
          Arrastre y/o suelte algunos archivos aquí, o haga clic para
          seleccionar archivos
        </p>
      </div>

      <CSSTransition
        in={files.length > 0 ? true : false}
        classNames="slide"
        timeout={200}
        unmountOnExit
      >
        <div>
          <aside style={{ padding: '15px 0' }}>
            <h3>Files</h3>
            <ul>
              {files &&
                files.map((file, key) => (
                  <li key={key} className="item-file">
                    <div className="file-info">
                      <span className="file-path">{file.path}</span>
                      <span className="file-size">{file.size} bytes</span>
                    </div>
                    <span
                      className="file-close"
                      onClick={() => handleFiles({ file })}
                    >
                      &times;
                    </span>
                  </li>
                ))}
            </ul>
          </aside>
          <div className="form-action center">{props.children}</div>
        </div>
      </CSSTransition>
    </div>
  );
};
