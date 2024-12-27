import { IShoe } from "../../models/IShoe";
import { ShoeForm } from "../ShoeForm/ShoeForm";
import { ShoeTable } from "../ShoeList/ShoeTable";
import styles from "./ShoeSection.module.scss";

interface ShoeSectionProps {
  handleSubmitShoe: (shoeModel: string) => void;
  shoes: IShoe[];
  loading: boolean;
  removeShoe: (id: string) => void;
}

export const ShoeSection = ({
  handleSubmitShoe,
  shoes,
  loading,
  removeShoe,
}: ShoeSectionProps) => {
  return (
    <div className={styles.content}>
      <ShoeForm handleSubmitShoe={handleSubmitShoe} />
      <ShoeTable shoes={shoes} loading={loading} removeShoe={removeShoe} />
    </div>
  );
};
