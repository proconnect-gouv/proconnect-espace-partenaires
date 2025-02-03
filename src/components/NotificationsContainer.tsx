import { Alert } from '@codegouvfr/react-dsfr/Alert';
import { fr } from '@codegouvfr/react-dsfr';

type Props = {
  error?: string | null;
  success?: string | null;
  onErrorClose?: () => void;
  onSuccessClose?: () => void;
};

export const NotificationsContainer = ({ 
  error, 
  success, 
  onErrorClose, 
  onSuccessClose 
}: Props) => {
  return (
    <div 
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 10000,
        maxWidth: '400px',
        backgroundColor: 'white'
      }}
    >
      {error && (
        <Alert
          severity="error"
          description={error}
          small
          closable
          onClose={onErrorClose}
        />
      )}
      {success && (
        <Alert
          severity="success"
          description={success}
          small
          closable
          onClose={onSuccessClose}
        />
      )}
    </div>
  );
}; 