import { IShoe } from "../../models/IShoe";
import { ShoeDetails } from "../ShoeDetails/ShoeDetails";
import { Spinner } from "../Spinner/Spinner";
import styles from "./ShoeTable.module.scss";

interface ShoesProps {
  shoes: IShoe[];
  loading: boolean;
  removeShoe: (id: string) => void;
}

export const ShoeTable = ({ shoes, loading, removeShoe }: ShoesProps) => {
  if (loading) {
    return <Spinner />;
  }

  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr>
          <th>Shoes</th>
        </tr>
      </thead>
      <tbody className={styles.tbody}>
        {shoes.map((shoe) => (
          <ShoeDetails shoe={shoe} key={shoe.id} removeShoe={removeShoe} />
        ))}
      </tbody>
    </table>
  );
};
