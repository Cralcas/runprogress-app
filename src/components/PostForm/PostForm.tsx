import { FormEvent, useEffect, useState } from "react";
import { Button } from "../Button/Button";
import { getShoes, IShoe } from "../../services/shoeService";
import { PostCreate } from "../../models/IPost";
import { PostType } from "../../models/types";

interface IPostFormProps {
  toggleModal: () => void;
  handleSubmitPost: (post: PostCreate) => void;
  postToEdit: PostType | null;
}

export const PostForm = ({
  toggleModal,
  handleSubmitPost,
  postToEdit,
}: IPostFormProps) => {
  const defaultPostData = {
    title: "",
    description: "",
    distance: "",
    pace: ["", ""],
    time: "",
    shoe: null,
  };

  const postData = postToEdit
    ? {
        title: postToEdit.title || "",
        description: postToEdit.description || "",
        distance: postToEdit.distance.toString() || "",
        pace: postToEdit.pace ? postToEdit.pace.split(":") : ["", ""],
        time: postToEdit.time || "",
        shoe: postToEdit.shoe || null,
      }
    : defaultPostData;

  const [title, setTitle] = useState(postData.title);
  const [description, setDescription] = useState(postData.description);
  const [distance, setDistance] = useState(postData.distance);
  const [pace, setPace] = useState({
    minutes: postData.pace[0],
    seconds: postData.pace[1],
  });
  const [time, setTime] = useState({
    hours: postData.time.split(":")[0] || "",
    minutes: postData.time.split(":")[1] || "",
  });
  const [shoe, setShoe] = useState<string | null>(postData.shoe);
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
        console.error("Error fetching shoes:", err);
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
      (time.hours && parseInt(time.hours) < 1) ||
      (time.minutes && parseInt(time.minutes) < 1)
    ) {
      setError("Time must include at least a few minutes or hours.");
      return;
    }

    setError("");

    const formattedPace = pace.minutes
      ? `${pace.minutes}:${pace.seconds || "00"}`
      : "";

    const formattedTime = `${time.hours}:${time.minutes}`;

    const postPayload: PostCreate = {
      title,
      description,
      distance: +distance,
      pace: formattedPace,
      time: formattedTime,
      shoe: shoe || null,
    };

    handleSubmitPost(postPayload);
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

        <label htmlFor="pace-seconds">Seconds</label>
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
        {postToEdit ? "Edit Post" : "Create Post"}
      </Button>
    </form>
  );
};
