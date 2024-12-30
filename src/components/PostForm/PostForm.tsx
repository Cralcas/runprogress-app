import { FormEvent, useEffect, useState } from "react";
import { Button } from "../Button/Button";
import { getShoes } from "../../services/shoeService";
import { PostCreate } from "../../models/IPost";
import { PostType } from "../../models/types";
import styles from "./PostForm.module.scss";
import { IShoe } from "../../models/IShoe";

interface PostFormProps {
  toggleModal: () => void;
  handleSubmitPost: (post: PostCreate) => void;
  postToEdit: PostType | null;
}

export const PostForm = ({
  toggleModal,
  handleSubmitPost,
  postToEdit,
}: PostFormProps) => {
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

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (pace.seconds && !pace.minutes) {
      setError("Pace must include minutes if seconds are provided.");
      return;
    }

    if (!time.hours && !time.minutes) {
      setError("Please enter input for time.");
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

    const postValues: PostCreate = {
      title,
      description,
      distance: +distance,
      pace: formattedPace,
      time: formattedTime,
      shoe: shoe || null,
    };

    handleSubmitPost(postValues);
    toggleModal();
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.input}>
        <label htmlFor="title">Title</label>
        <input
          className={styles.field}
          type="text"
          id="title"
          maxLength={50}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className={styles.input}>
        <label htmlFor="description">Description</label>
        <textarea
          className={styles.field}
          id="description"
          rows={5}
          maxLength={100}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className={styles.input}>
        <label htmlFor="distance">Distance in kilometers</label>
        <input
          className={styles.field}
          type="number"
          min={0.1}
          step={0.1}
          id="distance"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          required
        />
      </div>

      <div className={styles.shoes}>
        <label htmlFor="shoes">Select shoe</label>
        <select
          className={styles.select}
          name="shoes"
          id="shoes"
          value={shoe || ""}
          onChange={(e) => setShoe(e.target.value)}
        >
          <option value="">No shoe selected</option>
          {shoeList.map((shoe) => (
            <option key={shoe.id} value={shoe.id}>
              {shoe.model}
            </option>
          ))}
        </select>
      </div>

      <fieldset className={styles.fieldset}>
        <legend>Pace</legend>
        <div className={styles.input}>
          <label htmlFor="pace-minutes">Minutes</label>
          <input
            className={`${styles.field} ${styles.time}`}
            type="number"
            value={pace.minutes}
            min={1}
            max={99}
            id="pace-minutes"
            onChange={(e) =>
              setPace((prev) => ({
                ...prev,
                minutes: e.target.value,
              }))
            }
            placeholder="min"
          />
        </div>
        <div className={styles.input}>
          <label htmlFor="pace-seconds">Seconds</label>
          <input
            className={`${styles.field} ${styles.time}`}
            type="number"
            value={pace.seconds}
            max={59}
            min={0}
            id="pace-seconds"
            onChange={(e) =>
              setPace((prev) => ({
                ...prev,
                seconds: e.target.value,
              }))
            }
            placeholder="s"
          />
        </div>
      </fieldset>

      <fieldset className={styles.fieldset}>
        <legend>Time</legend>
        <div className={styles.input}>
          <label htmlFor="hours">Hours</label>
          <input
            className={`${styles.field} ${styles.time}`}
            type="number"
            value={time.hours}
            min={1}
            max={99}
            id="hours"
            onChange={(e) =>
              setTime((prev) => ({
                ...prev,
                hours: e.target.value,
              }))
            }
            placeholder="hr"
          />
        </div>

        <div className={styles.input}>
          <label htmlFor="minutes">Minutes</label>
          <input
            className={`${styles.field} ${styles.time}`}
            type="number"
            value={time.minutes}
            id="minutes"
            min={0}
            max={59}
            onChange={(e) =>
              setTime((prev) => ({
                ...prev,
                minutes: e.target.value,
              }))
            }
            placeholder="min"
          />
        </div>
      </fieldset>

      {error && <span className={styles.error}>{error}</span>}

      <Button type="submit" disabled={loading}>
        {postToEdit ? "Edit Post" : "Create Post"}
      </Button>
    </form>
  );
};
