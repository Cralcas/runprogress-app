import { Button } from "../Button/Button";

export const PostForm = () => {
  return (
    <form>
      <div>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" required />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <input type="text" id="description" />
      </div>
      <div>
        <label htmlFor="distance">Distance</label>
        <input type="number" id="distance" required />
      </div>
      <div>
        <label htmlFor="time">Time</label>
        <input type="text" id="distance" placeholder="h" required />
        <input type="text" id="distance" placeholder="min" required />
      </div>
      <div>
        <label htmlFor="time">Select a shoe</label>
        <select name="shoes" id="distance" />
      </div>

      <Button type="submit">Create Post</Button>
    </form>
  );
};
