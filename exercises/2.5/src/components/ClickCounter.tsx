interface ClickCounterProps {
  count: number;
  handleClick: (count: number) => void;
}

const ClickCounter = ({ count, handleClick }: ClickCounterProps) => {
  return <button onClick={() => handleClick(count)}>{count}</button>;
};

export default ClickCounter;
