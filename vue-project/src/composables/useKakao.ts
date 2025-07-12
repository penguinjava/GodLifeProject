import { ref } from 'vue'

const isKakaoInitialized = ref(false)

const loadKakaoSdk = () => {
    return new Promise<void>((resolve, reject) => {
        if (window.Kakao) {
            resolve()
            return
        }

        const script = document.createElement('script')
        script.src = 'https://developers.kakao.com/sdk/js/kakao.js'
        script.onload = () => resolve()
        script.onerror = () => reject('카카오 SDK 로드 실패')
        document.head.appendChild(script)
    })
}

export const useKakao = () => {
    const initKakao = async () => {
        try {
            await loadKakaoSdk()

            if (!window.Kakao.isInitialized()) {
                window.Kakao.init(import.meta.env.VITE_KAKAO_JS_KEY)
                console.log('✅ Kakao SDK 초기화 완료')
            } else {
                console.log('ℹ️ Kakao SDK는 이미 초기화됨')
            }

            isKakaoInitialized.value = true
        } catch (err) {
            console.error('❌ Kakao SDK 로딩 실패:', err)
            isKakaoInitialized.value = false
        }
    }


    return {
        initKakao,
        isKakaoInitialized,
    }
}
