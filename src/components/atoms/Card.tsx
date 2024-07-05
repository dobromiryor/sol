import clsx from "clsx";
import { ReactNode } from "react";

interface CardProps {
  title: string;
  isFallback: boolean | undefined;
  value: string | number;
  valueDescription?: string;
  additionalDescription: string;
  visualizationTopDescription?: ReactNode;
  visualizationIcon: ReactNode;
  visualizationBottomDescription?: ReactNode;
  visualizationSRDescription?: string;
}

export const Card = ({
  title,
  additionalDescription,
  value,
  valueDescription,
  isFallback,
  visualizationIcon,
  visualizationBottomDescription,
  visualizationTopDescription,
  visualizationSRDescription,
}: CardProps) => {
  return (
    <li
      className="flex flex-col gap-1 p-4 bg-primary text-inverted-text dark:text-text rounded-xl text-sm"
      tabIndex={0}
    >
      <h2>{title}</h2>

      <div
        className={clsx(
          "flex justify-between items-center transition-all h-full",
          isFallback && "blur"
        )}
      >
        <div className="flex flex-col gap-1">
          <div className="flex gap-1 items-end">
            <span className="text-2xl leading-7">{value}</span>
            {valueDescription && <span>{valueDescription}</span>}
          </div>
          <div className="flex flex-col text-xs text-inverted-text/75 dark:text-text/75">
            {additionalDescription}
          </div>
        </div>

        <div
          aria-hidden
          className="flex flex-col justify-center items-center text-xs text-inverted-text/75 dark:text-text/75"
        >
          {visualizationTopDescription !== undefined ? (
            visualizationTopDescription
          ) : (
            <div className="min-h-4 min-w-4" data-role="placeholder" />
          )}
          {visualizationIcon}
          {visualizationBottomDescription !== undefined ? (
            visualizationBottomDescription
          ) : (
            <div className="min-h-4 min-w-4" data-role="placeholder" />
          )}
        </div>

        {visualizationSRDescription && (
          <span className="sr-only">{visualizationSRDescription}</span>
        )}
      </div>
    </li>
  );
};
