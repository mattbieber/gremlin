import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import postCssPresetEnv from 'postcss-preset-env'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 3000,
    },
    css: {
        devSourcemap: true,
        postcss: {
            plugins: [
                postCssPresetEnv({
                    /* use stage 3 features + css nesting rules */
                    stage: 3,
                    features: {
                        'nesting-rules': true,
                    },
                }),
            ],
        },
    },
    plugins: [react()],
})
