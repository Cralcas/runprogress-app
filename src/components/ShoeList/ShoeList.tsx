import { IShoe } from "../../models/IShoe";
import { ShoeInfo } from "../Shoe/Shoe";
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
        <ShoeInfo shoe={shoe} key={shoe.model} />
      ))}
    </section>
  );
};
