import React, { useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { base_url } from '../utils/base_url';
interface CKEditorProps {
  value: string;
  theme?: 'light' | 'dark';
  onChange: (value: string) => void;
}

const CKEditorComponent: React.FC<CKEditorProps> = ({ value, onChange, theme = 'dark' }) => {
  const editorRef = useRef<any>(null);

  const handleEditorChange = (_: any, editor: any) => {
    const data = editor.getData();
    onChange(data);
  };

  return (
    <div className={`ckeditor-wrapper ${theme === 'dark' ? 'ckeditor-dark' : 'ckeditor-light'}`}>
      <CKEditor
        editor={ClassicEditor}
        data={value}
        config={{
          ckfinder: {
            uploadUrl: `${base_url}/product/uploadCkImage?command=QuickUpload&type=Files&responseType=json`,
            options: {
              resourceType: 'Images',
            }
          }
        }}
        onReady={(editor) => {
          editorRef.current = editor;
        }}
        onChange={handleEditorChange}
      />
    </div>

  );
};

export default CKEditorComponent;
