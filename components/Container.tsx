interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className = "" }: ContainerProps) => {
  return (
    <div className={`max-w-[1280px] mx-auto px-4 ${className}`}>{children}</div>
  );
};

export default Container;
