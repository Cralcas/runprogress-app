import { useEffect, useState } from "react";
import { addShoe, deleteShoe, getShoes } from "../services/shoeService";
import { ShoeForm } from "../components/ShoeForm/ShoeForm";

import { IShoe } from "../models/IShoe";
import { useAuth } from "../hooks/useAuth";
import { ShoeTable } from "../components/ShoeList/ShoeTable";

export const Profile = () => {
  const { user } = useAuth();
  const [shoes, setShoes] = useState<IShoe[]>([]);
  const [shoesLoading, setShoesLoading] = useState(false);

  async function loadShoesAndStats() {
    setShoesLoading(true);
    try {
      const fetchedShoes = await getShoes();
      setShoes(fetchedShoes);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setShoesLoading(false);
    }
  }

  useEffect(() => {
    loadShoesAndStats();
  }, []);

  async function handleSubmitShoe(shoeModel: string) {
    if (!user) return;

    const shoe = await addShoe(user.id, shoeModel);

    setShoes([shoe, ...shoes]);
  }

  async function removeShoe(id: string) {
    await deleteShoe(id);
    setShoes((prev) => prev.filter((shoe) => shoe.id !== id));
    console.log(id);
  }

  return (
    <section className="profile-section">
      Graph Component
      <section className="profile-content">
        <div className="profile-shoes">
          <ShoeForm handleSubmitShoe={handleSubmitShoe} />
          <ShoeTable
            shoes={shoes}
            loading={shoesLoading}
            removeShoe={removeShoe}
          />
        </div>
        <div>delete account</div>
      </section>
    </section>
  );
};
