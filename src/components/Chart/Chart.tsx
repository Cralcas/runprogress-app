import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { IChartData } from "../../models/IChartData";
import { Spinner } from "../Spinner/Spinner";

interface chartProps {
  data: IChartData[];
  loading: boolean;
}

export const Chart = ({ data, loading }: chartProps) => {
  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      <ResponsiveContainer
        width="100%"
        height="100%"
        minWidth="300px"
        minHeight="300px"
      >
        <LineChart width={300} height={300} data={data}>
          <Line type="monotone" dataKey="km" stroke="#0cce6b" />
          <Tooltip />
          <CartesianGrid stroke="#fff" strokeDasharray="3 3" />
          <YAxis stroke="#fff" />
          <XAxis dataKey="month" stroke="#fff" />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};
