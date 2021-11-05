import { FC } from 'react';
// import styles from './admin-editor.module.scss';
// @ts-ignore
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { saveToServer } from '../../utils';
import Editor from '../ckeditor5/build/ckeditor';

const AdminEditor: FC<{
  initial: string;
  onChangeEditor: (data: string) => void;
}> = ({ initial, onChangeEditor }) => {
  function uploadAdapter(loader: any) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          loader.file.then((file: File) => {
            saveToServer(file)
              .then((res) => {
                resolve({
                  default: `${res}`,
                });
              })
              .catch((err) => {
                reject(err);
              });
          });
        });
      },
    };
  }

  function uploadPlugin(editor: any) {
    editor.plugins.get('FileRepository').createUploadAdapter = (
      loader: any
    ) => {
      return uploadAdapter(loader);
    };
  }

  return (
    <div className="document-editor">
      <div className="document-editor__toolbar" />
      <div className="document-editor__editable-container">
        <CKEditor
          editor={Editor}
          data={initial}
          config={{
            extraPlugins: [uploadPlugin],
            htmlSupport: {
              allow: [
                {
                  name: /.*/,
                  attributes: true,
                  classes: true,
                  styles: true
                }
              ]
            }
          }}
          onReady={(editor: any) => {
            // @ts-ignore
            window.editor = editor;
            const toolbarContainer = document.querySelector(
              '.document-editor__toolbar'
            );
            // @ts-ignore
            toolbarContainer.appendChild(editor.ui.view.toolbar.element);
          }}
          onChange={(event: any, editor: { getData: () => string }) => {
            onChangeEditor(editor.getData());
          }}
        />
      </div>
    </div>
  );
};

export default AdminEditor;
