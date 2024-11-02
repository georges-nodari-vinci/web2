import { useState } from "react";

interface ClickCounterProps {
  title: string;
  count: number;
  handleClick: (count: number) => void;
  secretMessage?: string;
  hoverMessage?: string;
}

const ClickCounter = ({
  title,
  count,
  handleClick,
  secretMessage = "Bravo! Vous avez atteint 10 clics !",
  hoverMessage = "Please click on me now!",
}: ClickCounterProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div>
      <h2>{title}</h2>
      {isHovered && <p>{hoverMessage}</p>}
      <button
        onClick={() => handleClick(count)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {count}
      </button>
      <p>{count >= 10 && secretMessage}</p>
    </div>
  );
};

export default ClickCounter;
