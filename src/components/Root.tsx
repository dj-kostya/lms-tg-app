import React, { useEffect } from 'react';
import { App } from '@/components/App.tsx';
import { ErrorBoundary } from '@/components/ErrorBoundary.tsx';
import { AuthProvider, AuthLoadingScreen, AuthErrorScreen, useAuthContext } from '@/components/AuthProvider.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function ErrorBoundaryError({ error }: { error: unknown }) {
  return (
    <div>
      <p>An unhandled error occurred:</p>
      <blockquote>
        <code>
          {error instanceof Error
            ? error.message
            : typeof error === 'string'
              ? error
              : JSON.stringify(error)}
        </code>
      </blockquote>
    </div>
  );
}

const queryClient = new QueryClient();

const ReactQueryDevtoolsProduction = React.lazy(() =>
  import('@tanstack/react-query-devtools/build/modern/production.js').then(
    (d) => ({
      default: d.ReactQueryDevtools,
    }),
  ),
)

// Компонент для отображения состояния авторизации
function AuthWrapper() {
  const { isLoading, isAuthenticated, error, refetch } = useAuthContext();

  // Auto call refetch on mount
  useEffect(() => {
    refetch();
  }, []);

  if (isLoading) {
    return <AuthLoadingScreen />;
  }

  if (error && !isAuthenticated) {
    return <AuthErrorScreen error={error} onRetry={refetch} />;
  }

  return <App />;
}

export function Root({ debug }: { debug: boolean }) {
  console.log('🚀 Root', debug)
  return (
    <ErrorBoundary fallback={ErrorBoundaryError}>
      <QueryClientProvider client={queryClient}>
        {debug && <ReactQueryDevtoolsProduction />}
        <AuthProvider>
          <AuthWrapper />
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
