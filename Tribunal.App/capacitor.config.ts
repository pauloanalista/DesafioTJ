import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ilovecode.iptm',
  appName: 'IPTM',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchAutoHide: false,
      launchShowDuration: 3000,
      splashFullScreen: true,
      backgroundColor: "#121212",
    }
  }
};

export default config;
