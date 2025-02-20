import { useQuery } from "@tanstack/react-query";
import { getCategoryData } from "../../../apis/service";
import { CategoryData } from "../../../model/types";
import { useSearch } from "../../../hooks/useSearch";

export const Category = () => {
  //recoil 카테고리 상태
  const { search, updateCategory } = useSearch();

  //카테고리 값 option에 뿌리기
  const { data, isLoading, error } = useQuery<CategoryData[]>({
    queryKey: ["categoryData"], //쿼리 고유 식별자
    queryFn: getCategoryData, //데이터 가져오기 작업 수행함 -> apis/service.ts에 있다.
  });

  if (isLoading) return <p>로딩중....</p>;
  if (error) return <p>카테고리 값 가져오는데 에러남</p>;

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
      value={search.searchCategoryType.comm_cd}
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
