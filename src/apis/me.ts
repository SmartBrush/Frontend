import API from './api'

export interface Me {
  name: string
} // UI에서는 name으로 사용

function decodeNicknameFromJWT(token: string): string | null {
  try {
    const b64 = token.split('.')[1]
    if (!b64) return null
    const base = b64.replace(/-/g, '+').replace(/_/g, '/')
    const pad = base.length % 4 === 2 ? '==' : base.length % 4 === 3 ? '=' : ''
    const payload = JSON.parse(atob(base + pad))
    // ★ 이메일(sub)은 절대 사용 안 함
    return payload.nickname ?? payload.name ?? null
  } catch {
    return null
  }
}

export async function getMe(): Promise<Me> {
  // 0) 회원가입 등에서 저장해둔 닉네임이 있으면 최우선
  const cachedNick = localStorage.getItem('user_nickname')
  if (cachedNick && !cachedNick.includes('@')) {
    localStorage.setItem('user_name', cachedNick)
    return { name: cachedNick }
  }

  const token = localStorage.getItem('access_token') ?? ''

  // 1) 서버에서 nickname/name 우선
  if (token) {
    try {
      const r = await API.get('/api/users/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
      const nick =
        r?.data?.data?.nickname ??
        r?.data?.nickname ??
        r?.data?.data?.name ??
        r?.data?.name ??
        null
      if (nick && !String(nick).includes('@')) {
        localStorage.setItem('user_name', nick)
        localStorage.setItem('user_nickname', nick)
        return { name: nick }
      }
    } catch {
      /* ignore */
    }
  }

  // 2) JWT에서 nickname/name만 추출
  const decoded = token ? decodeNicknameFromJWT(token) : null
  if (decoded && !decoded.includes('@')) {
    localStorage.setItem('user_name', decoded)
    localStorage.setItem('user_nickname', decoded)
    return { name: decoded }
  }

  // 3) 과거에 email을 user_name에 저장했을 수 있으므로, 이메일이면 무시
  const bad = localStorage.Item('user_name')
  if (bad && !bad.includes('@')) return { name: bad }

  return { name: '사용자' }
}
