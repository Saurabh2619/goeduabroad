
import { 
  Modal,
  ModalHeader,
  ModalBody, 
  ModalContent,
  Input,
  Select,
  SelectItem,
  Button
} from '@nextui-org/react'
import { useLeadForm } from './useLeadForm'

const goals = [
  { value: 'study', label: 'Study Abroad' },
  { value: 'work', label: 'Work Abroad' },
  { value: 'immigration', label: 'Immigration' },
  { value: 'language', label: 'Language Programs' }
]

export const PopupLeadForm = () => {
  const {
    isOpen,
    formData,
    errors,
    handleChange,
    handleSubmit,
    closeModal,
    isLoading
  } = useLeadForm()

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={closeModal}
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          exit: {
            y: -20,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
            },
          },
        }
      }}
      classNames={{
        base: "bg-white font-sans p-4 rounded-2xl",
        
        body: "py-2",
      }}
    >
      <ModalContent>
        <ModalHeader>
          <h3 className="text-3xl font-semibold">
            Plan your Career in Abroad with <span className="text-primary">EduAbroad</span>
          </h3>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit} className="space-y-2">
            <Input
              label="Full Name"
              value={formData?.name}
              onChange={(e) => handleChange('name', e.target.value)}
              errorMessage={errors?.name}
              isInvalid={!!errors?.name}
              variant="bordered"
              classNames={{
                input: "bg-transparent",
                inputWrapper: "bg-transparent"
              }}
            />
            <Input
              label="Email Address"
              type="email"
              value={formData?.email}
              onChange={(e) => handleChange('email', e.target.value)}
              errorMessage={errors?.email}
              isInvalid={!!errors?.email}
              variant="bordered"
              classNames={{
                input: "bg-transparent",
                inputWrapper: "bg-transparent"
              }}
            />
            <Input
              label="Phone Number"
              type="tel"
              value={formData?.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              errorMessage={errors?.phone}
              isInvalid={!!errors?.phone}
              variant="bordered"
              classNames={{
                input: "bg-transparent",
                inputWrapper: "bg-transparent"
              }}
            />
           
            
            {Object?.keys(errors).length > 0 && (
              <p className="text-red-500 text-sm">Please fill all the fields</p>
            )}

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
  )
}

