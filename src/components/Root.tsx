import { App } from '@/components/App.tsx';
import { ErrorBoundary } from '@/components/ErrorBoundary.tsx';
import { AuthProvider, AuthLoadingScreen, AuthErrorScreen, useAuthContext } from '@/components/AuthProvider.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

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

// Компонент для отображения состояния авторизации
function AuthWrapper() {
  const { isLoading, isAuthenticated, error, refetch } = useAuthContext();

  if (isLoading) {
    return <AuthLoadingScreen />;
  }

  if (error && !isAuthenticated) {
    return <AuthErrorScreen error={error} onRetry={refetch} />;
  }

  return <App />;
}

export function Root({ debug }: { debug: boolean }) {
  console.log('🚀 Root')
  return (
    <ErrorBoundary fallback={ErrorBoundaryError}>
      <QueryClientProvider client={queryClient}>
        {debug && <ReactQueryDevtools />}
        <AuthProvider>
          <AuthWrapper />
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
