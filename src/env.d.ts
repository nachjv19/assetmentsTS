interface ImportMetaEnv {
  readonly VITE_API_URL?: string
  // add other VITE_ variables here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
