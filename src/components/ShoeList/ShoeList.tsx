import { IShoe } from "../../models/IShoe";
import { ShoeDetails } from "../ShoeDetails/ShoeDetails";

import { Spinner } from "../Spinner/Spinner";

interface ShoesProps {
  shoes: IShoe[];
  loading: boolean;
}

export const ShoeList = ({ shoes, loading }: ShoesProps) => {
  if (loading) {
    return <Spinner />;
  }
  return (
    <section>
      {shoes.map((shoe) => (
        <ShoeDetails shoe={shoe} key={shoe.id} />
      ))}
    </section>
  );
};
