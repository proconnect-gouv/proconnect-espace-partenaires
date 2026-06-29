import { fr } from "@codegouvfr/react-dsfr";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { Input } from "@codegouvfr/react-dsfr/Input";
import { Table } from "@codegouvfr/react-dsfr/Table";
import { ChangeEvent, useState } from "react";

type Props = {
  items: string[];
  onUpdate: (items: string[]) => void;
  title: string;
  description: string;
  label: string;
  placeholder: string;
  validateInput: (input: string) => boolean;
  inputValidationErrorMessage: string;
  tableTitle: string;
};

export const EditableList = ({
  items,
  onUpdate,
  title,
  description,
  label,
  placeholder,
  validateInput,
  inputValidationErrorMessage,
  tableTitle,
}: Props) => {
  const [inputText, setInputText] = useState<string>("");
  const [inputError, setInputError] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setInputText(value);

    // Clear error when input is empty
    if (!value) {
      setInputError(null);
      return;
    }

    // Only validate while typing if there's already an error
    if (inputError && validateInput(value)) {
      setInputError(null);
    }
  };

  const addItemToArray = () => {
    const trimmedText = inputText.trim();
    if (!trimmedText) return;

    if (!validateInput(trimmedText)) {
      setInputError(inputValidationErrorMessage);
      return;
    }

    onUpdate([...(items || []), trimmedText]);
    setInputText("");
    setInputError(null);
  };

  const removeItemFromArray = (indexToRemove: number) => {
    onUpdate(items.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className={fr.cx("fr-mb-10v")}>
      <h2>{title}</h2>
      <p>{description}</p>

      {items && items.length > 0 && (
        <div className={fr.cx("fr-mb-4v")}>
          <Table
            data={items.map((item, i) => [
              item,
              <Button
                key={i}
                priority="tertiary no outline"
                iconId="fr-icon-delete-bin-line"
                onClick={() => removeItemFromArray(i)}
                title="Supprimer cette ligne"
              >
                Supprimer
              </Button>,
            ])}
            className={fr.cx("fr-table--no-caption")}
            headers={[tableTitle, ""]}
            bordered={false}
            noCaption
          />
        </div>
      )}

      <div>
        <div style={{ position: "relative", paddingRight: "7rem", width: "650px" }}>
          <div>
            <Input
              label={label}
              state={inputError ? "error" : "default"}
              stateRelatedMessage={inputError}
              nativeInputProps={{
                value: inputText,
                placeholder,
                onChange: handleInputChange,
                onKeyPress: (e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addItemToArray();
                  }
                },
              }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              right: 0,
              top: "2.1rem", // Aligns with input field accounting for label
            }}
          >
            <Button disabled={!inputText || !!inputError} onClick={addItemToArray}>
              Ajouter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
