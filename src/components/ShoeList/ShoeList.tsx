import { IShoe } from "../../models/IShoe";
import { ShoeDetails } from "../ShoeDetails/ShoeDetails";
import styles from "./ShoeList.module.scss";
import { Spinner } from "../Spinner/Spinner";

interface ShoesProps {
  shoes: IShoe[];
  loading: boolean;
  removeShoe: (id: string) => void;
}

export const ShoeList = ({ shoes, loading, removeShoe }: ShoesProps) => {
  if (loading) {
    return <Spinner />;
  }

  return (
    <ul className={styles.list}>
      {shoes.map((shoe) => (
        <ShoeDetails shoe={shoe} key={shoe.id} removeShoe={removeShoe} />
      ))}
    </ul>
  );
};
