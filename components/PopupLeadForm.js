import { 
  Modal,
  ModalHeader,
  ModalBody, 
  ModalContent,
  Input,
  Button
} from '@nextui-org/react';
import { useState } from 'react';
import axios from 'axios';

const sendLead = async (leadData) => {
  const { name, phone, email } = leadData;

  if (!name || !phone || !email) {
    throw new Error("Missing required fields: name, phone, and email are required.");
  }

  try {
    const response = await axios.post("/api/sendlead", leadData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error sending lead:", error);
    throw error;
  }
};

export const PopupLeadForm = ({ isOpen, closeModal }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState('');

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      const response = await sendLead({
        firstname: formData.name,
        lastname: "", // Add if available
        phone: formData.phone,
        email: formData.email,
        city: "", // Add if available
        state: "", // Add if available
        country: "", // Add if available
        message: "Lead from popup form",
      });
      if (response) {
        setNotification("Submitted Successfully");
        closeModal();
      }
    } catch (error) {
      setNotification("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={closeModal}
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.3, ease: "easeOut" },
          },
          exit: {
            y: -20,
            opacity: 0,
            transition: { duration: 0.2, ease: "easeIn" },
          },
        }
      }}
      classNames={{ base: "bg-white font-sans p-4 rounded-2xl", body: "py-2" }}
    >
      <ModalContent>
        <ModalHeader>
          <h3 className="text-3xl font-semibold">
            Plan your Career Abroad with <span className="text-primary">EduAbroad</span>
          </h3>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit} className="space-y-2">
            <Input
              label="Full Name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              errorMessage={errors.name}
              isInvalid={!!errors.name}
              variant="bordered"
              classNames={{ input: "bg-transparent", inputWrapper: "bg-transparent" }}
            />
            <Input
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              errorMessage={errors.email}
              isInvalid={!!errors.email}
              variant="bordered"
              classNames={{ input: "bg-transparent", inputWrapper: "bg-transparent" }}
            />
            <Input
              label="Phone Number"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              errorMessage={errors.phone}
              isInvalid={!!errors.phone}
              variant="bordered"
              classNames={{ input: "bg-transparent", inputWrapper: "bg-transparent" }}
            />
            {notification && <p className="text-green-500 text-sm">{notification}</p>}
            <Button
              isLoading={isLoading}
              type="submit"
              className="w-full bg-black text-white"
              size="lg"
            >
              SUBMIT
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
