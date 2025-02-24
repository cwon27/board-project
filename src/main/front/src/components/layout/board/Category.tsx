import { useSearch } from "../../../hooks/useSearch";
import { useCategoryData } from "../../../hooks/useQuery";

interface CategoryProps {
  isUpdate: boolean;
  initialValue?: string;
}

export const Category = ({ isUpdate, initialValue }: CategoryProps) => {
  //recoil 카테고리 상태
  const { search, updateCategory } = useSearch();

  //카테고리 값 option에 뿌리기
  const { data, isLoading, error } = useCategoryData();

  if (isLoading) return <p>로딩중....</p>;
  if (error) return <p>카테고리 값 가져오는데 에러남</p>;

  //선택된 카테고리값
  const selectedValue = isUpdate
    ? initialValue
    : search.searchCategoryType.comm_cd;

  //카테고리 값 상태 업데이트 함수
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCode = e.target.value;
    const selectName =
      selectedCode == "ALL"
        ? "전체"
        : data?.find((category) => category.comm_cd == selectedCode)
            ?.comm_cd_nm || "전체";

    updateCategory(selectedCode, selectName);
  };

  return (
    <select
      className="select"
      style={{ width: "150px" }}
      value={selectedValue}
      onChange={handleChange}
    >
      <option value={"ALL"}>전체</option>
      {/* data 존재할 때만 실행 */}
      {data?.map((category) => (
        <option key={category.comm_cd} value={category.comm_cd}>
          {category.comm_cd_nm}
        </option>
      ))}
    </select>
  );
};
