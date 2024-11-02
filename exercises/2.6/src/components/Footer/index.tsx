interface FooterProps {
  children: React.ReactNode;
  imageUrl: string;
}

const index = (props: FooterProps) => {
  return (
    <div>
      <img src={props.imageUrl} alt="logo" width={50} height={50} />
      {props.children}
    </div>
  );
};

export default index;
