import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { IChartData } from "../../models/IChartData";
import { Spinner } from "../Spinner/Spinner";
import styles from "./Chart.module.scss";

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
      {data.length < 1 ? (
        <div className={styles.error}>
          <h2>No activity this year</h2>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={300}
            height={300}
            data={data}
            title="Area chart showing kilometers per month"
            accessibilityLayer
          >
            <Line type="monotone" dataKey="km" stroke="#0cce6b" />
            <Tooltip />
            <CartesianGrid stroke="#fff" strokeDasharray="3 3" />
            <YAxis stroke="#fff" width={20} />
            <XAxis dataKey="month" stroke="#fff" />
            <Area
              type="monotone"
              dataKey="km"
              stroke="#0cce6b"
              fill="#0cce6b"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </>
  );
};
