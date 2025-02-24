import { useImperativeHandle, useRef } from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/ko-kr";

interface ToastEditorProps {
  onChange: (cont: string) => void;
  initialValue?: string;
}

export const ToastEditor = ({
  onChange,
  initialValue = " ",
}: ToastEditorProps) => {
  //의존성 추가
  const editorRef = useRef<Editor>(null);

  //내용 데이터 변경시
  const handleChange = () => {
    const cont = editorRef.current?.getInstance().getHTML();
    onChange(cont);
  };

  return (
    <Editor
      ref={editorRef}
      initialValue={initialValue} // 초기값이고 수정할 때 사용할거임
      placeholder="내용을 입력해주세요."
      previewStyle="vertical"
      height="400px"
      initialEditType="wysiwyg"
      useCommandShortcut={false}
      language="ko-KR"
      hideModeSwitch={true}
      onChange={handleChange}
    />
  );
};
