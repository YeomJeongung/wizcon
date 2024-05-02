import { ref } from 'vue'

export const useValidation = (initialValue, validationFn) => {
  const value = ref(initialValue)
  const error = ref('')
  const isValid = ref(false) // 초기에는 유효하지 않은 상태로 설정합니다.

  const validate = () => {
    error.value = validationFn(value.value)
    isValid.value = error.value === ''
  }

  return {
    value,
    error,
    validate,
    isValid
  }
}
