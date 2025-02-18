interface ContainerProps {
  children: React.ReactNode; // children 타입을 React.ReactNode로 설정해서 Raect의 모든 요소를 받을 수 있게 함함
}

export const Container = ({ children }: ContainerProps) => {
  return <div className="container">{children}</div>;
};
