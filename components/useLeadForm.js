'use client'

import { useState, useEffect } from 'react'
import { z } from 'zod'
import { supabase } from '../utils/supabaseClient'
import { toast } from 'react-hot-toast'
import { cbKey } from '../utils/cronBerryKey'
import { useRouter } from 'next/router'

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
    
  })
  const [errors, setErrors] = useState({})

  function cronberryTrigger(username, u_email, u_mobile, u_year, u_city, linke,page) {



    var id = Date.now();
    var data = JSON.stringify({
        "projectKey": cbKey,
        "audienceId": id,
        "name": username,
        "email": u_email,
        "mobile": u_mobile,
        "ios_fcm_token": "",
        "web_fcm_token": "",
        "android_fcm_token": "",
        "profile_path": "",
        "active": "",
        "audience_id": "",
        "paramList": [{
                "paramKey": "source",
                "paramValue": ""
            },
            {
                "paramKey": "city",
                "paramValue": u_city
            },
            {
                "paramKey": "postcode",
                "paramValue": ""
            },
            {
                "paramKey": "total_amount",
                "paramValue": ""
            },
            {
                "paramKey": "abondon_cart",
                "paramValue": true
            },
            {
                "paramKey": "preparing_for_which_year",
                "paramValue": u_year
            },
            {
                "paramKey": "subject",
                "paramValue": ""
            },
            {
                "paramKey": "formurl",
                "paramValue": linke
            },
            {
                "paramKey": "formname",
                "paramValue": page ? page: '',
            }
        ]
    });
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function() {
  
        if (this.readyState === 4) {
            
            setIsLoading(false)
            toast.success('Submitted Successfully')
            
  
        }
    });
    xhr.open("POST", "https://register.cronberry.com/api/campaign/register-audience-data");
    xhr.setRequestHeader("Content-Type", "application/json");
  
  
    xhr.send(data);
  }


  

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
  const router = useRouter()
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate form data
    if (!formData.name || formData.name.trim() === '') {
      toast.error('Name is required');
      return;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }
  
    const phoneRegex = /^[0-9]{10,15}$/; // Adjust the range (10-15) if necessary
    if (!formData.phone || !phoneRegex.test(formData.phone)) {
      toast.error('Please enter a valid phone number');
      return;
    }
  
    // If validation succeeds, proceed
    const validatedData = formData;
  
    // Trigger the external function with required data
    cronberryTrigger(
      formData.fullname,
      formData.email,
      formData.phone,
      '', // Assuming the fourth parameter is optional or empty
      formData.city || 'N/A', // Default to 'N/A' if city is empty
      router?.pathname || '', // Ensure pathname is defined
      'GoEduAbroad Popup'
    );
  
    // Insert data into Supabase
    const { data, error } = await supabase.from('leads').insert(formData).select();
  
    if (error) {
      // Handle Supabase insert errors
      toast.error('Unable to Submit. Please try again later.');
      console.error('Supabase Error:', error);
      return;
    }
  
    if (data) {
      // Handle successful submission
      toast.success('Form Submitted Successfully');
      if (typeof window !== 'undefined') {
        localStorage.setItem('formSubmitted', 'true'); // Store submission status
      }
      setFormSubmitted(true); // Update state to reflect submission
      closeModal(); // Close the modal if applicable
    }
  };
  
  

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
