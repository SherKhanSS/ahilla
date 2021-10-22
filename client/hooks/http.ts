import { useState, useCallback } from 'react';

type UseHttpProps = {
  loading: boolean;
  request: (
    url: string,
    method?: string,
    body?: Record<string, unknown> | null,
    headers?: Record<string, unknown>
  ) => Promise<any>;
  error: string | null;
  clearError: () => void;
};

export const useHttp = (): UseHttpProps => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const request = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      setLoading(true);
      const token = localStorage.token ? localStorage.token : '';
      headers['Authorization'] = `Bearer ${token}`;

      try {
        if (body) {
          body = JSON.stringify(body);
          headers['Content-Type'] = 'application/json';
        }
        const response = await fetch(url, { method, body, headers });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Что-то пошло не так');
        }

        setLoading(false);

        return data;
      } catch (e) {
        setLoading(false);
        setError('Что-то пошло не так');
        throw e;
      }
    },
    []
  );

  const clearError = useCallback(() => setError(null), []);

  return { loading, request, error, clearError };
};
