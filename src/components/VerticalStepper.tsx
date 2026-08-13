import { fr } from "@codegouvfr/react-dsfr";
import React, { ReactNode } from "react";

interface StepProps {
  number: number;
  title: string;
  children: ReactNode;
  isLast?: boolean;
}

interface VerticalStepperProps {
  children: ReactNode;
}

const CIRCLE_SIZE = "2.5rem";

export function Step({ number, title, children, isLast }: StepProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `${CIRCLE_SIZE} 1fr`,
        columnGap: "1rem",
        // No fixed row height: the grid row grows with the content column,
        // and both cells stretch to that height by default (align-items: stretch).
      }}
    >
      {/* Number circle column */}
      {/* Indicator column: circle + growing line, same on mobile and desktop */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* The circle */}
        <div
          style={{
            width: CIRCLE_SIZE,
            height: CIRCLE_SIZE,
            flexShrink: 0,
            borderRadius: "50%",
            backgroundColor: fr.colors.decisions.background.actionHigh.blueFrance.active,
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.25rem",
            fontWeight: "bold",
          }}
        >
          {number}
        </div>

        {/* Vertical line - only show if not last element */}
        {/* Line fills whatever space is left in the stretched column —
            no calc(), no percentage-of-unknown-parent-height. */}
        {!isLast && (
          <div
            style={{
              flex: 1,
              width: "2px",
              minHeight: "1rem",
              backgroundColor: fr.colors.decisions.background.actionHigh.blueFrance.active,
            }}
          />
        )}
      </div>

      {/* Content column */}
      <div className={fr.cx("fr-pb-4w")}>
        <h2 className={fr.cx("fr-h4", "fr-mb-1w")}>{title}</h2>
        <div className={fr.cx("fr-text--md")}>{children}</div>
      </div>
    </div>
  );
}

export function VerticalStepper({ children }: VerticalStepperProps) {
  const childrenWithProps = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        isLast: index === React.Children.count(children) - 1,
      } as StepProps);
    }
    return child;
  });

  return <div className={fr.cx("fr-pt-2w")}>{childrenWithProps}</div>;
}
