import classes from "./Button.module.css";

const Button = ({
  name,
  title,
  icon,
  onClick,
  type = "button",
  variant = "primary",
  iconOnly = false,
  disabled = false,
}) => {
  const isIconOnly = iconOnly === true;
  const buttonClass = `${classes.btn} ${classes[variant]} ${iconOnly ? classes.iconOnly : ""}`;

  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
      title={title}
    >
      {icon && <span className={classes.icon}>{icon}</span>}

      {!isIconOnly && name}
    </button>
  );
};

export default Button;
