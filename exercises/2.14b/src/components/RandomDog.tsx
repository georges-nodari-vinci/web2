import { useEffect, useState } from "react";

const RandomDog = () => {
  const [imageUrl, setImageUrl] = useState<string>("");

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
    fetchRandomDog(); // Fetch initial image on mount
  }, []);

  return (
    <div>
      {imageUrl ? (
        <img src={imageUrl} alt="A random dog" style={{ width: "200px" }} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default RandomDog;
