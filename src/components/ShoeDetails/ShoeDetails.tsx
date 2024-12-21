import { IShoe } from "../../models/IShoe";

interface ShoeDetailsProps {
  shoe: IShoe;
}

export const ShoeDetails = ({ shoe }: ShoeDetailsProps) => {
  return (
    <div>
      {shoe.model} {shoe.mileage} km
    </div>
  );
};
