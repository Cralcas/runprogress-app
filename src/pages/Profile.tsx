import { useEffect, useState } from "react";
import { addShoe, deleteShoe, getShoes } from "../services/shoeService";
import { IShoe } from "../models/IShoe";
import { useAuth } from "../hooks/useAuth";
import { deleteAccount } from "../services/accountService";
import { DeleteAccount } from "../components/DeleteAccount/DeleteAccount";
import { Chart } from "../components/Chart/Chart";
import { IChartData } from "../models/IChartData";
import { getChartData } from "../services/chartService";
import { ShoeSection } from "../components/ShoeSection/ShoeSection";

export const Profile = () => {
  const { user, signOut } = useAuth();
  const [shoes, setShoes] = useState<IShoe[]>([]);
  const [chartData, setChartData] = useState<IChartData[]>([]);
  const [shoesLoading, setShoesLoading] = useState(false);
  const [chartDataLoading, setChartDataLoading] = useState(false);

  async function loadShoesAndChartData() {
    setShoesLoading(true);
    setChartDataLoading(true);
    try {
      const fetchedShoes = await getShoes();
      const fetchedChartData = await getChartData(2024);
      setShoes(fetchedShoes);
      setChartData(fetchedChartData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setShoesLoading(false);
      setChartDataLoading(false);
    }
  }

  useEffect(() => {
    loadShoesAndChartData();
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

  async function removeAccount() {
    await deleteAccount();
    signOut();
  }

  return (
    <section className="profile-section">
      <div className="profile-chart">
        <Chart data={chartData} loading={chartDataLoading} />
      </div>
      <section className="profile-content">
        <div className="profile-shoes">
          <ShoeSection
            handleSubmitShoe={handleSubmitShoe}
            loading={shoesLoading}
            removeShoe={removeShoe}
            shoes={shoes}
          />
        </div>
        <div className="profile-account">
          <DeleteAccount removeAccount={removeAccount} />
        </div>
      </section>
    </section>
  );
};
