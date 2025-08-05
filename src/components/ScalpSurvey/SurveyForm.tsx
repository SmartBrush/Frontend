export interface SurveyForm {
  nickname: string
  email: string
  gender: string
  age: number
  hairLength: string
  dyedOrPermedRecently: boolean | null
  familyHairLoss: 'EXISTS' | 'NONE' | 'UNKNOWN' | null
  wearHatFrequently: boolean | null
  uvExposureLevel: string
  washingFrequency: string
  usingProducts: string[]
  eatingHabits: string[]
  scalpSymptoms: string[]
  sleepDuration: string
  sleepStartTime: string
}
