import { FormEvent, useState } from "react";
import { Button } from "../Button/Button";

interface ShoeFormProps {
  handleSubmitShoe: (shoeModel: string) => void;
}

export const ShoeForm = ({ handleSubmitShoe }: ShoeFormProps) => {
  const [shoeModel, setShoeModel] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    handleSubmitShoe();
  }

  return (
    <form>
      <div>
        <label htmlFor="shoe">Add Shoe</label>
        <input type="text" id="shoe" />
      </div>
      <Button type="submit">Add</Button>
    </form>
  );
};
