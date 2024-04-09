import React, { useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { base_url } from '../utils/base_url';
interface CKEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const CKEditorComponent: React.FC<CKEditorProps> = ({ value, onChange }) => {
  const editorRef = useRef<any>(null);

  const handleEditorChange = (event: any, editor: any) => {
    console.log(event);

    const data = editor.getData();
    onChange(data);
  };

  return (
    <CKEditor
      editor={ClassicEditor}
      data={value}
      config={{
        ckfinder: {
          // uploadUrl: 'https://ckeditor.com/apps/ckfinder/3.5.0/core/connector/php/connector.php?command=QuickUpload&type=Files&responseType=json',  
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
  );
};

export default CKEditorComponent;
