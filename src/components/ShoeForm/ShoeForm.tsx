import { FormEvent, useState } from "react";
import { Button } from "../Button/Button";
import styles from "./ShoeForm.module.scss";

interface ShoeFormProps {
  handleSubmitShoe: (shoeModel: string) => void;
}

export const ShoeForm = ({ handleSubmitShoe }: ShoeFormProps) => {
  const [shoeModel, setShoeModel] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    handleSubmitShoe(shoeModel);
    setShoeModel("");
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor="shoe">Add Shoe</label>
      <div className={styles.input}>
        <input
          className={styles.field}
          type="text"
          id="shoe"
          maxLength={40}
          value={shoeModel}
          onChange={(e) => setShoeModel(e.target.value)}
          required
        />
        <Button type="submit" size="default" className={styles.button}>
          Add
        </Button>
      </div>
    </form>
  );
};
