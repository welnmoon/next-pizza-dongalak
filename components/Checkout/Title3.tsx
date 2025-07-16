interface Props {
  title: string;
}

const Title3 = ({ title }: Props) => {
  return <h3 className="text-lg font-bold">{title}</h3>;
};

export default Title3;
