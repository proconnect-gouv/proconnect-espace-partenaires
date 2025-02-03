import { Button } from "@codegouvfr/react-dsfr/Button";
import { Input } from "@codegouvfr/react-dsfr/Input";
import { fr } from "@codegouvfr/react-dsfr";
import { useState } from "react";

type Props = {
  label: string;
  value: string;
  readOnly?: boolean;
};

export const CopyableField = ({ label, value, readOnly = true }: Props) => {
  const [copied, setCopied] = useState(false);

  const copyToClipBoard = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className={fr.cx("fr-grid-row")}>
      <div className={fr.cx("fr-col-md-7")}>
        <Input
          label={label}
          nativeInputProps={{
            value,
            readOnly
          }}
        />
      </div>
      <div className={fr.cx("fr-col-md-auto")} style={{ paddingTop: "calc(1.5rem + 8px)", paddingLeft: "1rem" }}>
        <Button
          priority={copied ? "success" : "secondary"}
          onClick={copyToClipBoard}
          iconId={copied ? "fr-icon-checkbox-circle-fill" : "fr-icon-clipboard-line"}
        >
          {copied ? "Copié !" : "Copier"}
        </Button>
      </div>
    </div>
  );
}; 