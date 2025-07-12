import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    proxy: {
      // '/api' 로 시작하는 요청은 모두 아래 타겟으로 포워딩
      '/api': {
        target: 'http://localhost:8080', // 스프링 부트가 띄워진 주소
        changeOrigin: true, // 호스트 헤더를 타겟 URL로 변경
        rewrite: (path) => path.replace(/^\/api/, '/api'),
        // (필요에 따라) /api 를 다른 path 로 매핑하고 싶으면 여기를 수정
      },
    },
  },
})
