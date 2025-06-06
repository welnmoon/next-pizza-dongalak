interface Props {
  title: string;
  className?: string;
}

const Title3 = ({ title, className }: Props) => {
  return <h3 className="text-lg font-bold">{title}</h3>;
};

export default Title3;
