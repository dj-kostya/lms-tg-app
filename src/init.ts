import {
  setDebug,
  mountBackButton,
  restoreInitData,
  init as initSDK,
  bindThemeParamsCssVars,
  mountViewport,
  bindViewportCssVars,
  mockTelegramEnv,
  type ThemeParams,
  themeParamsState,
  retrieveLaunchParams,
  emitEvent,
  miniApp,
  isViewportMounted,
} from '@telegram-apps/sdk-react';

/**
 * Initializes the application and configures its dependencies.
 */
export async function init(options: {
  debug: boolean;
  eruda: boolean;
  mockForMacOS: boolean;
}): Promise<void> {
  // Set @telegram-apps/sdk-react debug mode and initialize it.
  setDebug(options.debug);
  console.log('🚀 init')
  initSDK();
  console.log('🚀 initSDK')

  // Add Eruda if needed.
  options.eruda && void import('eruda').then(({ default: eruda }) => {
    console.log('Eruda init');
    eruda.init();
    eruda.position({ x: window.innerWidth - 50, y: window.innerHeight - 50 });
  });

  // Telegram for macOS has a ton of bugs, including cases, when the client doesn't
  // even response to the "web_app_request_theme" method. It also generates an incorrect
  // event for the "web_app_request_safe_area" method.
  if (options.mockForMacOS) {
    console.log('🚀 mockForMacOS')
    let firstThemeSent = false;
    mockTelegramEnv({
      onEvent(event, next) {
        console.log('🚀 onEvent', event)
        if (event[0] === 'web_app_request_theme') {
          let tp: ThemeParams = {};
          if (firstThemeSent) {
            tp = themeParamsState();
          } else {
            firstThemeSent = true;
            tp ||= retrieveLaunchParams().tgWebAppThemeParams;
          }
          return emitEvent('theme_changed', { theme_params: tp });
        }

        if (event[0] === 'web_app_request_safe_area') {
          return emitEvent('safe_area_changed', { left: 0, top: 0, right: 0, bottom: 0 });
        }

        next();
      },
    });
  }

  // Mount all components used in the project.
  mountBackButton.ifAvailable();
  restoreInitData();
  console.log('🚀 restoreInitData')

  if (miniApp.mountSync.isAvailable()) {
    miniApp.mountSync();
    bindThemeParamsCssVars();
    console.log('🚀 miniApp.mountSync')
  }

  if (mountViewport.isAvailable() && !isViewportMounted()) {
    const mounted = await safeMountViewport(mountViewport, 1000);

    // Логируем исход
    console.log('🚀 mountViewport result:', { mounted, isViewportMounted: isViewportMounted() });

    // Биндим CSS-переменные только если Viewport действительно смонтирован.
    if (mounted || isViewportMounted()) {
      try {
        bindViewportCssVars();
        console.log('🚀 bindViewportCssVars');
      } catch (e) {
        console.warn('Skipping bindViewportCssVars(): viewport not mounted yet', e);
      }
    } else {
      console.warn('Viewport did not mount (timeout or platform issue) — skip bindViewportCssVars()');
    }
  }
  console.log('🚀 mountViewport')
}

async function safeMountViewport(
  mount: () => Promise<void>,
  timeoutMs = 1500
): Promise<boolean> {
  let completed = false;
  const timeout = new Promise<void>((_, rej) =>
    setTimeout(() => rej(new Error('mountViewport timeout')), timeoutMs)
  );

  await Promise.race([
    mount().then(() => {
      completed = true;
    }),
    timeout,
  ]).catch((e) => {
    console.warn(e);
  });

  return completed;
}