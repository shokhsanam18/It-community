export function useTelegram() {
    const tg = window.Telegram.WebApp;
  
    return {
      tg,
      user: tg?.initDataUnsafe?.user,
      theme: tg?.themeParams,
      close: tg?.close,
      sendData: tg?.sendData,
      expand: tg?.expand,
    };
  }