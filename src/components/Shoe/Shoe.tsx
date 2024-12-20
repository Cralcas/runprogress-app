import { IShoe } from "../../models/IShoe";

interface ShoeInfoProps {
  shoe: IShoe;
}

export const ShoeInfo = ({ shoe }: ShoeInfoProps) => {
  return (
    <div>
      {shoe.model} {shoe.mileage} km
    </div>
  );
};
