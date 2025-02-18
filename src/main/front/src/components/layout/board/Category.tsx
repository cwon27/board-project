import { useQuery } from "@tanstack/react-query";
import { getCategoryData } from "../../../apis/service";
import { CategoryData } from "../../../model/types";
import { useRecoilState } from "recoil";
import { CategoryState } from "../../../store/text.atom";

export const Category = () => {
  //카테고리 값 option에 뿌리기
  const { data, isLoading, error } = useQuery<CategoryData[]>({
    queryKey: ["categoryData"],
    queryFn: getCategoryData,
  });

  //recoil 카테고리 상태
  const [selectedCategory, setSelectedCategory] = useRecoilState(CategoryState);

  if (isLoading) return <p>로딩중....</p>;
  if (error) return <p>카테고리 값 가져오는데 에러남</p>;

  //카테고리 값 상태 업데이트 함수
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = data?.find(
      (category) => category.comm_cd_nm == e.target.value
    );
    if (selected) setSelectedCategory(selected);
  };

  return (
    <select
      className="select"
      style={{ width: "150px" }}
      value={selectedCategory.comm_cd_nm}
      onChange={handleChange}
    >
      <option key={"ALL"}>전체</option>
      {/* data 존재할 때만 실행 */}
      {data?.map((category) => (
        <option key={category.comm_cd}>{category.comm_cd_nm}</option>
      ))}
    </select>
  );
};
