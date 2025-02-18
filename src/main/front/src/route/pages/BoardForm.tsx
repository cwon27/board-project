import { FormTable } from "../../components/layout/board/boardForm/FormTable";
import { FormBtn } from "../../components/layout/board/boardForm/FormBtn";

interface BoardFormProps {
  isUpdate: boolean;
}

export const BoardForm = ({ isUpdate }: BoardFormProps) => {
  return (
    <>
      <FormTable isUpdate={isUpdate} />
      <FormBtn isUpdate={isUpdate} />
    </>
  );
};
