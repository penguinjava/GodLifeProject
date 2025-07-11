# 2025-07-12
# 📝 Kakao OAuth 인증 + NestJS + Vue3 작업 정리

## 📦 기술 스택

- 백엔드: NestJS, JWT, Passport
- 프론트엔드: Vue3, Pinia, Kakao SDK
- 인증 방식: 카카오 로그인 OAuth2.0 + JWT Access/Refresh Token

---

## 🔐 인증 흐름 요약

1. Vue에서 Kakao SDK로 로그인 요청 (`authorize`)
2. Kakao에서 redirectUri로 인가 코드 전달
3. 백엔드 `/auth/kakao`에서:
    - 카카오 토큰 요청
    - 사용자 정보 조회
    - JWT AccessToken(1시간), RefreshToken(30일) 발급
    - RefreshToken은 UUID로 발급하여 DB 저장
4. AccessToken을 포함한 redirect 응답 → 프론트로 전달
5. Vue에서 토큰을 localStorage에 저장하고 사용자 정보 요청 (`/auth/me`)
6. 이후 인증이 필요한 요청에는 `Authorization: Bearer <token>` 헤더 포함

---

## ✅ 백엔드 (NestJS)

- `@Redirect()` + `@HttpCode(302)`를 활용한 클라이언트 리다이렉트 처리
- `@UseGuards(AuthGuard('jwt'))`로 인증 보호 라우터 설정
- `@Req()`에 사용자 정보를 담기 위해 커스텀 타입 `AuthRequest` 작성
- 사용자 인증 정보 조회용 `/auth/me` 엔드포인트 구현
- JWT AccessToken(1시간), RefreshToken(30일) 발급 및 검증 구조 구성
- Express Response 객체를 사용하지 않고 `@Redirect()` 등 NestJS 방식 유지

### 📄 토큰 저장 테이블 구조 예시 (tokens)

| 필드명       | 설명                        |
|--------------|-----------------------------|
| `t_idx`       | 토큰 PK (serial)            |
| `user_id`     | 유저 식별자 (UUID 등)       |
| `token_id`    | 발급된 refresh token의 UUID |
| `refresh`     | 실제 Refresh Token 문자열    |
| `created_at`  | 발급 시간                   |
| `updated_at`  | 마지막 갱신 시간            |

---

## ✅ 프론트엔드 (Vue3 + Pinia)

- `auth` 스토어 구현:
    - `token`, `user`, `isAuthenticated`, `isLoading` 상태 관리
    - `kakaoLogin()` → Kakao SDK `authorize()` 호출
    - `setToken()`, `restoreToken()`, `logout()` 구현
    - `loadToken()`은 중복되어 제거함
- 로그인 후 AccessToken은 localStorage에 저장
- 인증 API 요청 시 헤더에 자동 포함
- RefreshToken은 httpOnly 쿠키로 처리 예정 (Vue에서는 접근 불가)

```ts
const isAuthenticated = computed(() => !!token.value)
# GodLifeProject
