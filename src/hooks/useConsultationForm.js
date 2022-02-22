import { useState } from 'react'
import { omit } from 'lodash-es'
import { principalMapping, consultationMapping, IMPORTANT_LEVEL_IDS } from '../constants/dummyConsultationData'


export function useConsultationForm(INITIAL_STATE) {
  const [errors, setErrors] = useState({})
  const [currentMember, setCurrentMember] = useState(null)
  const [memberInput, setMemberInput] = useState('')
  const [memberPhoneInput, setMemberPhoneInput] = useState('')
  const [currentPet, setCurrentPet] = useState(null)
  const [petInput, setPetInput] = useState('')
  const [creatingConsultation, setCreatingConsultation] = useState(INITIAL_STATE)

  const onImportantLevelRadio = targetTag => () => {
    if (creatingConsultation.propertyTags.some(item => item.id === targetTag.id)) return
    const clearedPropertyTag = creatingConsultation.propertyTags.filter(item => !IMPORTANT_LEVEL_IDS.includes(item.id))

    setCreatingConsultation((prev) => ({
      ...prev,
      propertyTags: [...clearedPropertyTag, targetTag]
    }))
  }

  const onTagToggle = targetTag => () => {
    setCreatingConsultation((prev) => ({
      ...prev,
      propertyTags: prev.propertyTags.some(item => item.id === targetTag.id)
        ? prev.propertyTags.filter(item => item.id !== targetTag.id)
        : [...prev.propertyTags, targetTag]
    }))
  }

  const onMemberChange = (e, optionValue) => {
    setErrors(omit(errors, ['member', 'phone']))
    setCurrentMember(optionValue)
    setCurrentPet(null)
    // setPetInput('')
  }

  const onMemberInputChange = (e, newInputValue) => {
    setMemberInput(newInputValue)
    if (currentMember && (currentMember.name !== newInputValue)) {
      setCurrentMember(null)
      setCurrentPet(null)
      setPetInput('')
    }
  }

  const onMemberPhoneInputChange = (e, newInputValue) => {
    setMemberPhoneInput(newInputValue)
    if (currentMember && (currentMember.mobile !== newInputValue)) {
      setCurrentMember(null)
      setCurrentPet(null)
      setPetInput('')
    }
  }

  const onPetChange = (e, optionValue) => {
    setCurrentPet(optionValue)
  }

  const onPetInputChange = (event, newInputValue) => {
    setPetInput(newInputValue);
  }

  const onPrincipalChange = e => {
    setErrors(omit(errors, 'principal'))
    setCreatingConsultation((prev) => ({
      ...prev,
      principal: {
        ...prev.principal,
        id: e.target.value,
        name: principalMapping[e.target.value]
      },
    }))
  }

  const onCategoryChange = e => {
    setErrors(omit(errors, 'category'))
    setCreatingConsultation((prev) => ({
      ...prev,
      category: {
        ...prev.category,
        id: e.target.value,
        name: consultationMapping[e.target.value]
      },
    }))
  }

  const onRemindChange = name => newValue => {
    setErrors(omit(errors, name))
    setCreatingConsultation((prev) => ({
      ...prev,
      [name]: newValue,
    }))
    // if (newValue instanceof Date && !isNaN(newValue)) {
    //   setErrors(omit(errors, name))
    //   setCreatingConsultation((prev) => ({
    //     ...prev,
    //     [name]: new Date(newValue).getTime(),
    //   }))
    // } else {
    //   setCreatingConsultation((prev) => ({
    //     ...prev,
    //     [name]: null,
    //   }))
    // }
  }

  const onTextChange = e => {
    setErrors(omit(errors, 'text'))
    setCreatingConsultation((prev) => ({
      ...prev,
      text: e.target.value,
    }))
  }

  const resetForm = () => {
    setCurrentMember(null)
    setMemberInput('')
    setMemberPhoneInput('')
    setCurrentPet(null)
    setPetInput('')
    setCreatingConsultation(INITIAL_STATE)
  }


  return {
    errors,
    currentMember,
    currentPet,
    memberInput,
    memberPhoneInput,
    petInput,
    creatingConsultation,
    setErrors,
    setCreatingConsultation,
    onImportantLevelRadio,
    onTagToggle,
    onMemberChange,
    onMemberInputChange,
    onMemberPhoneInputChange,
    onPetChange,
    onPetInputChange,
    onPrincipalChange,
    onCategoryChange,
    onRemindChange,
    onTextChange,
    resetForm,
  }
}