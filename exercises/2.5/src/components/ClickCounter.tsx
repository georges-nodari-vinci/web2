interface ClickCounterProps {
  title: string;
  count: number;
  handleClick: (count: number) => void;
  secretMessage?: string;
}

const ClickCounter = ({
  title,
  count,
  handleClick,
  secretMessage,
}: ClickCounterProps) => {
  return (
    <div>
      <h2>{title}</h2>
      <button onClick={() => handleClick(count)}>{count}</button>
      <p>{count >= 10 && secretMessage}</p>
    </div>
  );
};

export default ClickCounter;
