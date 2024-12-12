import { FormEvent, useEffect, useState } from "react";
import { Button } from "../Button/Button";
import { getShoes, IShoe } from "../../services/shoeService";

export interface IPost {
  title: string;
  description: string;
  distance: number;
  time: string;
  shoe: string;
}

interface IPostFormProps {
  toggleModal: () => void;
  handleSubmitPost: (post: IPost) => void;
}

export const PostForm = ({ toggleModal, handleSubmitPost }: IPostFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [distance, setDistance] = useState("");
  const [time, setTime] = useState({ hours: "", minutes: "" });
  const [shoe, setShoe] = useState("");
  const [shoeList, setShoeList] = useState<IShoe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadShoes() {
      setLoading(true);
      try {
        const data = await getShoes();
        setShoeList(data);
      } catch (err) {
        console.error("Error fetching goal:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    }

    loadShoes();
  }, []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    //TODO ändra så det inte går att skriva text (ändra till number) i hours och minutes lägga till pace
    //Fixa om shoe = null

    const formattedTime = `${time.hours}h ${time.minutes}m`;

    const postData: IPost = {
      title,
      description,
      distance: +distance,
      time: formattedTime,
      shoe: shoe,
    };

    handleSubmitPost(postData);
    toggleModal();
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="distance">Distance</label>
        <input
          type="number"
          id="distance"
          min={1}
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="time">Time</label>
        <input
          type="text"
          value={time.hours}
          id="hours"
          onChange={(e) =>
            setTime((prev) => ({
              ...prev,
              hours: e.target.value,
            }))
          }
          placeholder="h"
        />
        <input
          type="text"
          value={time.minutes}
          onChange={(e) =>
            setTime((prev) => ({
              ...prev,
              minutes: e.target.value,
            }))
          }
          id="minutes"
          placeholder="min"
        />
      </div>
      <div>
        <label htmlFor="shoes">Select a shoe</label>
        <select
          name="shoes"
          id="shoes"
          value={shoe}
          onChange={(e) => setShoe(e.target.value)}
        >
          <option value="">--Please choose an option--</option>
          {shoeList.map((shoe) => (
            <option key={shoe.id} value={shoe.id}>
              {shoe.model}
            </option>
          ))}
        </select>
      </div>

      {error && <span>{error}</span>}
      <Button type="submit" disabled={loading}>
        {loading ? "Createing Post..." : "Create Post"}
      </Button>
    </form>
  );
};
