import { useEffect, useState } from "react";

const RandomDog = () => {
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    // Fetch a random dog image when the component mounts
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => setImageUrl(data.message))
      .catch((error) => console.error(error));
  }, []); // Only run on component mount

  return (
    <div>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="A random dog"
          style={{ width: "200px" }}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default RandomDog;
