/**
 * API сервис для авторизации пользователей
 */


export interface AuthResponse {
  verified: boolean;
  user?: {
    allows_write_to_pm: boolean;
    first_name: string;
    id: number;
    is_premium: boolean;
    last_name?: string;
    language_code: string;
    photo_url?: string;
    username?: string;
  };
  auth_date?: string;
  user_id?: number;
  user_name?: string;
  is_authenticated: boolean;
}

export interface LoginRequest {
  initData: string;
}

/**
 * Выполняет авторизацию пользователя через Telegram Init Data
 * @param initData - Telegram Init Data строка
 * @returns Promise с результатом авторизации
 */
export async function login(initData: string): Promise<AuthResponse> {
  try {
    // Определяем URL в зависимости от окружения
    const isDevelopment = import.meta.env.DEV;
    const apiUrl = isDevelopment 
      ? '/api/user/login' // Используем прокси в разработке
      : 'https://n8n.tg.knosorev.ru/webhook/api/user/login'; // Прямой URL в продакшене
    
    
    console.log('🚀 Sending login request to:', apiUrl);
    console.log('📝 Init data string:', initData);
    console.log('🔧 Is development mode:', isDevelopment);
    
    const requestHeaders = {
      'Content-Type': 'application/json',
      'X-TG-INIT-DATA': initData, // Отправляем raw init data строку
    };
    
    console.log('📤 Request headers:', requestHeaders);
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      mode: 'cors',
      headers: requestHeaders,
      body: JSON.stringify({ initData: initData }), // Также отправляем в body для совместимости
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = (await response.json()) as unknown as AuthResponse;
    console.log('📥 Auth response:', data);
    return data;
  } catch (error) {
    console.error('Auth login error:', error);
    return {
      verified: false,
      is_authenticated: false,
    };
  }
}

