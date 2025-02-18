import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/ko-kr";

export const ToastEditor = () => {
  return (
    <Editor
      initialValue=" " // 초기값이고 수정할 때 사용할거임
      placeholder="내용을 입력해주세요."
      previewStyle="vertical"
      height="400px"
      initialEditType="wysiwyg"
      useCommandShortcut={false}
      language="ko-KR"
      hideModeSwitch={true}
    />
  );
};
