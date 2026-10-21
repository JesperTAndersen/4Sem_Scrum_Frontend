import styles from "./QuickCreate.module.css";
import { useNavigate } from "react-router";
import { FiPlus } from "react-icons/fi";
import Button from "@/shared/components/ui/Button/Button";

const QuickCreate = ({ collapsed }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <Button
        name="Nyt projekt"
        variant="secondary"
        icon={<FiPlus />}
        iconOnly={collapsed}
        onClick={() =>
          navigate("/projects", { state: { openCreateForm: true } })
        }
      />
    </div>
  );
};

export default QuickCreate;
