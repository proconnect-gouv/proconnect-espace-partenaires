import { Button } from '@codegouvfr/react-dsfr/Button';
import { Input } from '@codegouvfr/react-dsfr/Input';
import { Table } from '@codegouvfr/react-dsfr/Table';
import { fr } from '@codegouvfr/react-dsfr';
import { ChangeEvent, useState } from 'react';

type Props = {
  urls: string[];
  onUpdate: (urls: string[]) => void;
  title?: string;
  description?: string;
  label?: string;
};

export const ProviderUrl = ({
  urls = [],
  onUpdate,
  title = '',
  description = '',
  label = '',
}: Props) => {
  const [inputUrl, setInputUrl] = useState<string>('');
  const [inputError, setInputError] = useState<string | null>(null);

  const validateUrl = (url: string): boolean => {
    const urlPattern = /^https?:\/\/[^/].+$/;
    return urlPattern.test(url);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setInputUrl(value);

    // Clear error when input is empty
    if (!value) {
      setInputError(null);
      return;
    }

    // Only validate while typing if there's already an error
    if (inputError && validateUrl(value)) {
      setInputError(null);
    }
  };

  const addUrlInArray = () => {
    const trimmedUrl = inputUrl.trim();
    if (!trimmedUrl) return;

    if (!validateUrl(trimmedUrl)) {
      setInputError(
        "L'URL doit commencer par https:// ou http:// et contenir un nom de domaine"
      );
      return;
    }

    onUpdate([...(urls || []), trimmedUrl]);
    setInputUrl('');
    setInputError(null);
  };

  const removeUrl = (indexToRemove: number) => {
    onUpdate(urls.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className={fr.cx('fr-mb-10v')}>
      <h2>{title}</h2>
      <p>{description}</p>

      {urls && urls.length > 0 && (
        <div className={fr.cx('fr-mb-4v')}>
          <Table
            data={urls.map((url, i) => [
              url,
              <Button
                key={i}
                priority="tertiary no outline"
                iconId="fr-icon-delete-bin-line"
                onClick={() => removeUrl(i)}
                title="Supprimer cette URL"
              >
                Supprimer
              </Button>,
            ])}
            className={fr.cx('fr-table--no-caption')}
            headers={['URLs configurées', '']}
            bordered={false}
            noCaption
          />
        </div>
      )}

      <div className={fr.cx('fr-form-group')}>
        <div
          style={{ position: 'relative', paddingRight: '7rem', width: '650px' }}
        >
          <div>
            <Input
              label={label}
              state={inputError ? 'error' : 'default'}
              stateRelatedMessage={inputError}
              nativeInputProps={{
                value: inputUrl,
                placeholder: 'https://',
                onChange: handleInputChange,
                onKeyPress: (e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addUrlInArray();
                  }
                },
              }}
            />
          </div>
          <div
            style={{
              position: 'absolute',
              right: 0,
              top: '2.1rem', // Aligns with input field accounting for label
            }}
          >
            <Button
              disabled={!inputUrl || !!inputError}
              onClick={addUrlInArray}
            >
              Ajouter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
