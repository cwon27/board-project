import { Link } from "react-router-dom";

interface FormBtnProps {
  isUpdate: boolean;
}

export const FormBtn = ({ isUpdate }: FormBtnProps) => {
  return (
    <div className="btn-box r">
      <Link to="#" className="btn btn-red">
        저장
      </Link>
      <Link to="/board/list" className="btn btn-default">
        취소
      </Link>
    </div>
  );
};
