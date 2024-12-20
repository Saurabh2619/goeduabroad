'use client'

import { useState, useEffect } from 'react'
import { z } from 'zod'
import { supabase } from '../utils/supabaseClient'
import { toast } from 'react-hot-toast'

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^\+?[1-9]\d{9,14}$/, 'Please enter a valid phone number'),
  goal: z.string().min(1, 'Please select a goal')
})

export const useLeadForm = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading,setIsLoading] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('formSubmitted') === 'true'
    }
    return false
  })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    goal: ''
  })
  const [errors, setErrors] = useState({})

  // Open form after 10 seconds if not submitted
  useEffect(() => {
    if (!formSubmitted) {
      const timer = setTimeout(() => setIsOpen(true), 10000)
      return () => clearTimeout(timer) // Cleanup timeout
    }
  }, [formSubmitted])

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const validatedData = formSchema.parse(formData)
      const { data, error } = await supabase.from('leads').insert([validatedData])

      if (data) {
        toast.success('Form Submitted Successfully')
        if (typeof window !== 'undefined') {
          localStorage.setItem('formSubmitted', 'true') // Store submission status
        }
        setFormSubmitted(true) // Mark as submitted
        closeModal()
        return
      }
      if (error) {
        toast.error('Unable to Submit')
        return
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = {}
        error.errors.forEach(err => {
          if (err.path[0]) {
            fieldErrors[err.path[0]] = err.message
          }
        })
        setErrors(fieldErrors)
      }
    }
  }

  const closeModal = () => setIsOpen(false)

  return {
    isOpen,
    formData,
    errors,
    handleChange,
    handleSubmit,
    closeModal,
    isLoading
  }
}
