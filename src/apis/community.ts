import API from './api'

export interface Concern {
  id: number
  title: string
  content: string
  author: string
  profileImage: string
  createdAt: string
}

export interface ConcernDetail extends Concern {
  liked: boolean
  likeCount: number
  commentCount: number
}

export interface CommentItem {
  id: number
  author: string
  content: string
  profileImage: string
  createdAt: string
}

/** 리스트 */
export async function fetchConcernList(): Promise<Concern[]> {
  const { data } = await API.get('/api/community/list')
  return data
}

/** 검색 */
export async function searchConcerns(keyword: string): Promise<Concern[]> {
  const { data } = await API.get('/api/community/search', {
    params: { keyword },
  })
  return data
}

/** 상세(좋아요/댓글 수 포함) */
export async function fetchConcernDetail(
  id: string | number,
): Promise<ConcernDetail> {
  const { data } = await API.get(`/api/community/detail/${id}`)
  return {
    id: data.id,
    title: data.title,
    content: data.content,
    author: data.author,
    profileImage: data.profileImage,
    createdAt: data.createdAt,
    liked: !!data.liked,
    likeCount: data.likeCount ?? 0,
    commentCount: data.commentCount ?? 0,
  }
}

/** 댓글 목록 */
export async function fetchComments(
  concernId: string | number,
): Promise<CommentItem[]> {
  const { data } = await API.get(`/api/community/${concernId}/comments`)
  return data
}

/** 댓글 작성 → 작성된 댓글 반환(백엔드 스펙에 맞춤) */
export async function createComment(
  concernId: string | number,
  content: string,
) {
  const { data } = await API.post(`/api/community/${concernId}/comments`, {
    content,
  })
  return data as CommentItem | { commentCount?: number } // 둘 다 대응
}

/** 댓글 수정 */
export async function updateComment(commentId: number, content: string) {
  const { data } = await API.put(`/api/community/comments/${commentId}`, {
    content,
  })
  return data as CommentItem
}

/** 댓글 삭제 */
export async function deleteComment(commentId: number) {
  const { data } = await API.delete(`/api/community/comments/${commentId}`)
  return data as { commentCount?: number } | undefined
}

// 좋아요/취소
export async function postLike(concernId: string | number) {
  const { data } = await API.post(`/api/community/${concernId}/like`)
  // 서버 예: { liked: true, likeCount: 3 }
  return data as { liked: boolean; likeCount: number }
}

export async function deleteLike(concernId: string | number) {
  const { data } = await API.delete(`/api/community/${concernId}/like`)
  // 서버 예: { liked: false, likeCount: 2 }
  return data as { liked: boolean; likeCount: number }
}

// isLiked 기준 토글 헬퍼(원하면 사용)
export async function toggleLike(concernId: string | number, isLiked: boolean) {
  return isLiked ? deleteLike(concernId) : postLike(concernId)
}
