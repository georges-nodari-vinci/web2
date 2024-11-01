interface HeaderProps {
  children: React.ReactNode;
  imageUrl: string;
}

const index = (props: HeaderProps) => {
  return (
    <div>
      <img src={props.imageUrl} alt="logo" width={50} height={50} />
      {props.children}
    </div>
  );
};

export default index;
