// import styles from './admin-editor.module.scss';

import { saveToServer } from '../../utils';

import React, { FC, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import initFullProps from './initFullProps';

// function uploadAdapter(loader: any) {
//   return {
//     upload: () => {
//       return new Promise((resolve, reject) => {
//         loader.file.then((file: File) => {
//           saveToServer(file)
//             .then((res) => {
//               resolve({
//                 default: `${res}`,
//               });
//             })
//             .catch((err) => {
//               reject(err);
//             });
//         });
//       });
//     },
//   };
// }
//
// function uploadPlugin(editor: any) {
//   editor.plugins.get('FileRepository').createUploadAdapter = (
//     loader: any
//   ) => {
//     return uploadAdapter(loader);
//   };
// }

const AdminTinyEditor: FC<{
  initial: string;
  onChangeEditor: (data: string) => void;
}> = ({ initial, onChangeEditor }) => {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  return (
    <>
      <Editor
        init={{
          ...initFullProps,
        }}
        // tinymceScriptSrc="/tinymce/tinymce.min.js"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue="<p>This is the initial content of the editor.</p>"
        // init={{
        //   height: 500,
        //   menubar: false,
        //   plugins: [
        //     'advlist autolink lists link image charmap print preview anchor',
        //     'searchreplace visualblocks code fullscreen',
        //     'insertdatetime media table paste code help wordcount',
        //   ],
        //   toolbar:
        //     'undo redo | formatselect | ' +
        //     'bold italic backcolor | alignleft aligncenter ' +
        //     'alignright alignjustify | bullist numlist outdent indent | ' +
        //     'removeformat | help',
        //   content_style:
        //     'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        // }}
      />
      <button onClick={log}>Log editor content</button>
    </>
  );
};

export default AdminTinyEditor;
