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
    <li className={styles.item}>
      <div>{shoe.model}</div>
      <div>{shoe.mileage} km</div>
      <Button variant="icon" type="button" size="icon" onClick={handleRemove}>
        <IoIosClose />
      </Button>
    </li>
  );
};
