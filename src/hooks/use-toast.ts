
import { Toast, ToastActionElement, ToastProps } from "@/components/ui/toast"
import {
  useToast as useToastInternal,
} from "@/components/ui/use-toast"

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const useToast = () => {
  const { toast, ...rest } = useToastInternal()

  return {
    toast,
    ...rest,
  }
}

export { useToast, type ToasterToast }
export const toast = useToastInternal().toast
