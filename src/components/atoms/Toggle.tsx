import clsx from "clsx";

interface SwitchProps {
  state: boolean;
  setState: () => void;
  title: string;
  description?: string;
}

export const Switch = ({
  state,
  setState,
  title,
  description,
}: SwitchProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col">
        <span className="font-medium">{title}</span>
        {description && <span className="text-sm">{description}</span>}
      </div>
      <button
        role="switch"
        className={clsx(
          "flex justify-center items-center h-6 w-12 rounded-full transition-all duration-300 border-2",
          state ? "bg-primary" : "bg-secondary"
        )}
        onClick={setState}
      >
        <div
          className={clsx(
            "h-6 w-6 rounded-full transition-all",
            state ? "bg-secondary" : "bg-accent"
          )}
        />
      </button>
    </div>
  );
};
