import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Button } from "../Button/Button";
import styles from "./ChartPagination.module.scss";

interface ChartPaginationProps {
  currentYear: number;
  handlePreviousYear: () => void;
  handleNextYear: () => void;
  loading: boolean;
}

export const ChartPagination = ({
  currentYear,
  handlePreviousYear,
  handleNextYear,
  loading,
}: ChartPaginationProps) => {
  return (
    <div className={styles.buttonContainer}>
      <Button onClick={handlePreviousYear} disabled={loading}>
        <FaAngleLeft />
      </Button>
      <span>{currentYear}</span>
      {currentYear < new Date().getFullYear() && (
        <Button onClick={handleNextYear} disabled={loading}>
          <FaAngleRight />
        </Button>
      )}
    </div>
  );
};
