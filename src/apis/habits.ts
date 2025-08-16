import API from './api'

export type HabitCategory = 'LIFESTYLE' | 'SCALP' | 'NUTRITION'

export interface DailyHabitItemDTO {
  id: number
  category: HabitCategory
  itemText: string
  completed: boolean
}

export interface DailyHabitResponseDTO {
  date: string
  itemsByCategory: Record<HabitCategory, DailyHabitItemDTO[]>
}

export async function fetchTodayHabits(): Promise<DailyHabitResponseDTO> {
  const res = await API.get<DailyHabitResponseDTO>('/api/habits/daily')
  return res.data
}

export async function toggleHabit(id: number): Promise<void> {
  await API.patch(`/api/habits/${id}`)
}
