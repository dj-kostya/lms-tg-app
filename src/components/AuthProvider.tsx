import { createContext, useContext, ReactNode } from 'react';
import { useAuth, type AuthContextType } from '@/hooks/useAuth';

// Создаем контекст для авторизации
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Провайдер авторизации, который оборачивает приложение и предоставляет
 * контекст авторизации всем дочерним компонентам
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Хук для использования контекста авторизации
 * @returns Контекст авторизации
 * @throws Error если используется вне AuthProvider
 */
export function useAuthContext(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}

/**
 * Компонент для отображения состояния загрузки авторизации
 */
export function AuthLoadingScreen() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      gap: '16px',
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '4px solid #f3f3f3',
        borderTop: '4px solid #3498db',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
      }} />
      <p>Проверка авторизации...</p>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

/**
 * Компонент для отображения ошибки авторизации
 */
export function AuthErrorScreen({ error, onRetry }: { error: string; onRetry: () => void }) {
  const isCorsError = error.includes('CORS') || error.includes('fetch');
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      gap: '16px',
      padding: '20px',
      textAlign: 'center',
    }}>
      <div style={{ fontSize: '48px' }}>{isCorsError ? '🔧' : '⚠️'}</div>
      <h2>{isCorsError ? 'Режим разработки' : 'Ошибка авторизации'}</h2>
      <p style={{ color: '#666', maxWidth: '300px' }}>
        {isCorsError 
          ? 'Сервер авторизации недоступен. Приложение работает в режиме разработки с мок-данными.'
          : error
        }
      </p>
      <button
        onClick={onRetry}
        style={{
          padding: '12px 24px',
          backgroundColor: isCorsError ? '#28a745' : '#3498db',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '16px',
        }}
      >
        {isCorsError ? 'Продолжить с мок-данными' : 'Попробовать снова'}
      </button>
    </div>
  );
}
