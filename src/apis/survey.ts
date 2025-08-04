import type { SurveyForm } from '../components/ScalpSurvey/SurveyForm'
import axios from './api'

export const submitSurvey = (form: SurveyForm) => {
  return axios.post('/api/question/save', form, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
}
