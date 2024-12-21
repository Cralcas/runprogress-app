import { useEffect, useState } from "react";
import { addShoe, getShoes } from "../services/shoeService";
import { ShoeForm } from "../components/ShoeForm/ShoeForm";
import { ShoeList } from "../components/ShoeList/ShoeList";
import { IShoe } from "../models/IShoe";
import { useAuth } from "../hooks/useAuth";

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

    setShoes([...shoes, shoe]);
  }

  return (
    <section className="profile-section">
      Graph Component
      <section className="profile content">
        <ShoeForm handleSubmitShoe={handleSubmitShoe} />
        <ShoeList shoes={shoes} loading={shoesLoading} />
      </section>
    </section>
  );
};
