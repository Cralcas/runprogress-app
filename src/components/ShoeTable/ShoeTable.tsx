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
      <thead>
        <tr>
          <th>Shoes</th>
        </tr>
      </thead>
      <tbody>
        {shoes.length < 1 ? (
          <tr>
            <td>No shoes added.</td>
          </tr>
        ) : (
          shoes.map((shoe) => (
            <ShoeDetails shoe={shoe} key={shoe.id} removeShoe={removeShoe} />
          ))
        )}
      </tbody>
    </table>
  );
};
