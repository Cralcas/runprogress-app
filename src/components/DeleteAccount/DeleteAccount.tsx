import { Button } from "../Button/Button";
import styles from "./DeleteAccount.module.scss";

interface DeleteAccountProps {
  removeAccount: () => void;
}

export const DeleteAccount = ({ removeAccount }: DeleteAccountProps) => {
  function handleRemove() {
    removeAccount();
  }

  return (
    <div className={styles.buttonContainer}>
      <Button
        className={styles.button}
        type="button"
        variant="danger"
        ariaLabel="Delete account"
        onClick={handleRemove}
      >
        Delete Account
      </Button>
    </div>
  );
};
