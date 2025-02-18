import { Form } from "../../components/layout/board/boardForm/Form";

interface BoardFormProps {
  isUpdate: boolean;
}

export const BoardForm = ({ isUpdate }: BoardFormProps) => {
  return (
    <>
      <Form isUpdate={isUpdate} />
    </>
  );
};
