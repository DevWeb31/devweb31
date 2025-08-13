import { useState, useCallback } from 'react';

export type SnackbarType = 'success' | 'info' | 'warning' | 'error';

interface SnackbarState {
  message: string;
  type: SnackbarType;
  isVisible: boolean;
}

export const useSnackbar = () => {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    message: '',
    type: 'success',
    isVisible: false,
  });

  const showSnackbar = useCallback(
    (message: string, type: SnackbarType = 'success') => {
      setSnackbar({
        message,
        type,
        isVisible: true,
      });
    },
    []
  );

  const hideSnackbar = useCallback(() => {
    setSnackbar(prev => ({
      ...prev,
      isVisible: false,
    }));
  }, []);

  return {
    snackbar,
    showSnackbar,
    hideSnackbar,
  };
};
