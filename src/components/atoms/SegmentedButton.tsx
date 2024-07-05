import clsx from "clsx";

interface SegmentedButton {
  id: number;
  title: string;
  onClick: () => void;
}

interface SegmentedButtonProps {
  title: string;
  buttons: SegmentedButton[];
  selectedId: number;
}

export const SegmentedButton = ({
  title,
  buttons,
  selectedId,
}: SegmentedButtonProps) => {
  return (
    <section aria-labelledby={`${title}-label`} className="flex flex-col gap-2">
      <span id={`${title}-label`} className="font-medium">
        {title}
      </span>
      <div className="flex">
        {buttons.map((item, index) => (
          <button
            key={`Segmented__Button__${item.id}__${index}__${item.title}`}
            onClick={item.onClick}
            className={clsx(
              "px-3 py-1 border-y border-l last:border border-accent first:rounded-l-full last:rounded-r-full transition-color duration-300",
              selectedId === item.id
                ? "bg-accent hover:bg-accent/80"
                : "hover:bg-accent/50"
            )}
            autoFocus={selectedId === item.id}
          >
            {item.title}
          </button>
        ))}
      </div>
    </section>
  );
};
