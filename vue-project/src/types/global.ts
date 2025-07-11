export {}

declare global {
    interface Window {
        Kakao: {
            isInitialized(): boolean
            init(key: string): void
            Auth: {
                authorize(options: { redirectUri: string }): void
            }
        }
    }
}