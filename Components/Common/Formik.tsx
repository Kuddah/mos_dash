import { Col, Form, Row } from "react-bootstrap";
import { useEffect, useState, useRef } from "react";
import React from "react";
import { useDropzone } from "react-dropzone";
// import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css";
import Image from "next/image";


export function RenderTextareaField(name, placeholder, formik) {
  const editorRef = useRef<any>();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor }: any = editorRef.current || {};

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    setEditorLoaded(true);
  }, []);

  return editorLoaded ? (
    <CKEditor
      editor={ClassicEditor}
      data={formik.values[name]}
      onChange={(event, editor) => {
        const data = editor.getData();
        formik.setFieldValue(name, data);
      }}
    />
  ) : (
    <p>Loading editor...</p>
  );
}

// const formik = useFormik();


  export function RenderDropzone({ name, placeholder, onDrop }) {
    const [files, setFiles] = useState([]);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      // accept: {
      //   "image/png": [".png"],
      //   "image/gif": [".gif"],
      //   "image/jpeg": [".jpeg"],
      //   "application/pdf": [".pdf"],
      //   "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      //     [".docx"],
      // },
      
      onDrop: (acceptedFiles) => {
        const newFiles = acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            formattedSize: formatBytes(file.size),
          })
        );
        setFiles(newFiles);
  
        acceptedFiles.forEach(file => {
          const reader = new FileReader();
          reader.onload = function(e) {
            const base64String = (e.target.result as string).replace(/^data:.+;base64,/, '');
            onDrop(name, base64String);
          };
          reader.readAsDataURL(file);
          console.log(acceptedFiles)
        });
      },
    });
  
    // ... rest of your function
  
  

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );
  const resetFiles = () => {
    setFiles([]);
  };
  const filePreview = (file) => {
    if (file.type.startsWith("image/")) {
      return <Image src={file.preview} alt={file.name} width= {100} height= {100} />;
    } else if (file.type === "application/pdf") {
      return <i className="fas fa-file-pdf" style={{fontSize: "50px", color: "red"}}></i>;
    } else if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      return <i className="fas fa-file-word" style={{fontSize: "50px", color: "blue"}}></i>;
    } else {
      return <i className="fas fa-file" style={{fontSize: "50px"}}></i>;
    }
  };
  return (
    <div>
      <div {...getRootProps()} className="dropzone dz-clickable text-center">
        <input {...getInputProps()} />
        {isDragActive ? (
          <h4>Drag & Drop files here or click to upload.</h4>
        ) : (
          <p>{placeholder}</p>
        )}

        {files.length > 0 && (
          <div>
            {files.map((file, i) => (
              <div key={i}>
                {filePreview(file)}
                <h4>{file.name}</h4>
                <p>{file.formattedSize}</p>
              </div>
            ))}
            <button onClick={resetFiles}>Reset</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default RenderDropzone;



export function renderTextField(type, name, placeholder, formik, readonly) {
  return (
    <Form.Control
    className="d-flex align-items-center justify-content-center"
      type={type}
      name={name}
      placeholder={placeholder}
      value={formik.values[name]}
      onChange={formik.handleChange}
      disabled={readonly}
      isValid={formik.touched[name] && !formik.errors[name]}
      isInvalid={formik.touched[name] && !!formik.errors[name]}
    />
  );
}

export function renderRadio(name, options, formik) {
  return options.map((option, index) => (
    <Form.Check
      key={index}
      type="radio"
      label={option}
      name={name}
      id={`${name}${index}`}
      value={option}
      checked={formik.values[name] === option}
      onChange={formik.handleChange}
      isValid={formik.touched[name] && !formik.errors[name]}
      isInvalid={formik.touched[name] && !!formik.errors[name]}
    />
  ));
}

export function renderSelect(name, placeholder, options, formik) {
  return (
    <Form.Select
      name={name}
      value={formik.values[name]}
      onChange={formik.handleChange}
      placeholder={placeholder}
      isValid={formik.touched[name] && !formik.errors[name]}
      isInvalid={formik.touched[name] && !!formik.errors[name]}
      
    >
      <option hidden disabled value="">
        {placeholder}
      </option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </Form.Select>
  );
}

export function renderColumn(data, formik) {
  return (
    <div style={{ flex: 1, marginRight: 10 }}>
      <Form.Group className="mb-3">
        {data.map(
          ({ name, type, label, placeholder, component, options,readonly, onDrop }) => (
            <Row className="mb-3 me-3 d-flex align-items-center justify-content-center" key={name}>
              <Col lg={3}>
                <Form.Label>{label}</Form.Label>
              </Col>
              <Col lg={9}>
                {component === "field"
                  ? type === "textarea"
                    ? RenderTextareaField(name, placeholder, formik)
                    : renderTextField(type, name, placeholder, formik, readonly)
                  : component === "radio"
                  ? renderRadio(name, options, formik)
                  : component === "select"
                  ? renderSelect(name, placeholder, options, formik)
                  : null}
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  {formik.errors[name]}
                </Form.Control.Feedback>
              </Col>
            </Row>
          )
        )}
      </Form.Group>
    </div>
  );
}
const handleDrop = (files) => {
  console.log('Files dropped:', files);
  // handle the dropped files here
};
export function renderColumns(data, formik, handleDrop) {
  return (
    <div style={{ flex: 1, marginRight: 10 }}>
      <Form.Group className="mb-3">
        {data.map(
          ({ name, type, label, placeholder, component, options, readonly, onDrop }) => (
            <Row className="mb-3 me-3" key={name}>
              <Col lg={12}>
                <Form.Label className="text-center">
                  <h5 className="text-center">{label}</h5>
                </Form.Label>

                {component === "field" ? (
                  type === "textarea" ? (
                    RenderTextareaField(name, placeholder, formik)
                  ) : (
                    renderTextField(type, name, placeholder, formik, readonly)
                  )
                ) : component === "dropzone" ? (
                  <RenderDropzone
                    name={name}
                    placeholder={placeholder}
                    onDrop={handleDrop}
                  />
                ) : null}
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  {formik.errors[name]}
                </Form.Control.Feedback>
              </Col>
            </Row>
          )
        )}
      </Form.Group>
    </div>
  );
}

