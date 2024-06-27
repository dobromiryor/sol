/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_OWM_URL: string;
  readonly VITE_OWM_KEY: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
