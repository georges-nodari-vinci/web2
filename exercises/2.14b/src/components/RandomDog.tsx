import { useEffect, useState } from "react";

const RandomDog = () => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const fetchRandomDog = async () => {
    try {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setImageUrl(data.message);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Fetch an initial image when the component mounts
    fetchRandomDog();

    // Setup interval for regular updates
    const interval = setInterval(() => {
      if (!isHovered) {
        fetchRandomDog(); // Only fetch if not hovered
      }
    }, 5000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [isHovered]); // Re-run effect when hover state changes

  return (
    <div
      onMouseEnter={() => setIsHovered(true)} // Set hover state to true on mouse enter
      onMouseLeave={() => setIsHovered(false)} // Reset hover state on mouse leave
    >
      {imageUrl ? (
        <img src={imageUrl} alt="A random dog" style={{ width: "200px" }} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default RandomDog;
