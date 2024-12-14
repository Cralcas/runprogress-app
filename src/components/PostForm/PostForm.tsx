import { FormEvent, useEffect, useState } from "react";
import { Button } from "../Button/Button";
import { getShoes, IShoe } from "../../services/shoeService";
import { IPost } from "../../models/IPost";

interface IPostFormProps {
  toggleModal: () => void;
  handleSubmitPost: (post: IPost) => void;
}

export const PostForm = ({ toggleModal, handleSubmitPost }: IPostFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [distance, setDistance] = useState("");
  const [pace, setPace] = useState({ minutes: "", seconds: "" });
  const [time, setTime] = useState({ hours: "", minutes: "" });
  const [shoe, setShoe] = useState<string | null>("");
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

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (pace.seconds && !pace.minutes) {
      setError("Pace must include minutes if seconds are provided.");
      return;
    }

    if (
      (!time.hours || parseInt(time.hours) < 1) &&
      (!time.minutes || parseInt(time.minutes) < 1)
    ) {
      setError("Time must include at least a few minutes or hours.");
      return;
    }

    setError("");

    const formattedTime = time.hours
      ? `${time.hours}h${
          time.minutes && time.minutes !== "0" ? ` ${time.minutes}min` : ""
        }`
      : `${time.minutes}min`;

    const formattedPace = pace.minutes
      ? `${pace.minutes}:${pace.seconds || "00"} /km`
      : "";

    const postData: IPost = {
      title,
      description,
      distance: +distance,
      pace: formattedPace,
      time: formattedTime,
      shoe: shoe || null,
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
        <textarea
          id="description"
          rows={5}
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
        <fieldset>
          <legend>Pace</legend>

          <label htmlFor="pace-minutes">Minutes</label>
          <input
            type="number"
            value={pace.minutes}
            min={1}
            id="pace-minutes"
            onChange={(e) =>
              setPace((prev) => ({
                ...prev,
                minutes: e.target.value,
              }))
            }
            placeholder="min"
          />

          <label htmlFor="minutes">Seconds</label>
          <input
            type="number"
            value={pace.seconds}
            id="pace-seconds"
            onChange={(e) =>
              setPace((prev) => ({
                ...prev,
                seconds: e.target.value,
              }))
            }
            placeholder="s"
          />
        </fieldset>
      </div>
      <div>
        <fieldset>
          <legend>Time</legend>

          <label htmlFor="hours">Hours</label>
          <input
            type="number"
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

          <label htmlFor="minutes">Minutes</label>
          <input
            type="number"
            value={time.minutes}
            id="minutes"
            onChange={(e) =>
              setTime((prev) => ({
                ...prev,
                minutes: e.target.value,
              }))
            }
            placeholder="min"
          />
        </fieldset>
      </div>
      <div>
        <label htmlFor="shoes">Select a shoe</label>
        <select
          name="shoes"
          id="shoes"
          value={shoe || ""}
          onChange={(e) => setShoe(e.target.value || null)}
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
        Create Post
      </Button>
    </form>
  );
};
