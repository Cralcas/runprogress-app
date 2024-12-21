import { FormEvent, useState } from "react";
import { Button } from "../Button/Button";

interface ShoeFormProps {
  handleSubmitShoe: (shoeModel: string) => void;
}

export const ShoeForm = ({ handleSubmitShoe }: ShoeFormProps) => {
  const [shoeModel, setShoeModel] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    handleSubmitShoe(shoeModel);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="shoe">Add Shoe</label>
        <input
          type="text"
          id="shoe"
          value={shoeModel}
          onChange={(e) => setShoeModel(e.target.value)}
          required
        />
      </div>
      <Button type="submit">Add</Button>
    </form>
  );
};
