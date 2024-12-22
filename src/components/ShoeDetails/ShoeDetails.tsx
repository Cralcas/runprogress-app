import { IoIosClose } from "react-icons/io";
import { IShoe } from "../../models/IShoe";
import { Button } from "../Button/Button";
import styles from "./ShoeDetails.module.scss";

interface ShoeDetailsProps {
  shoe: IShoe;
  removeShoe: (id: string) => void;
}

export const ShoeDetails = ({ shoe, removeShoe }: ShoeDetailsProps) => {
  function handleRemove() {
    removeShoe(shoe.id);
  }

  return (
    <tr>
      <td>{shoe.model}</td>
      <td>{shoe.mileage} km</td>
      <td>
        <Button
          className={styles.button}
          variant="icon"
          type="button"
          size="icon"
          onClick={handleRemove}
          ariaLabel="Delete shoe"
        >
          <IoIosClose className={styles.delete} />
        </Button>
      </td>
    </tr>
  );
};
