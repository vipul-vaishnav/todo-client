import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

type CustomDialogProps = {
  ButtonTrigger: React.ReactNode
  title?: string
  description?: string
  children: React.ReactNode
}

const CustomDialog: React.FC<CustomDialogProps> = (props) => {
  const { ButtonTrigger, title, description, children } = props

  return (
    <Dialog>
      <DialogTrigger asChild>{ButtonTrigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {(title || description) && (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
        )}
        {children}
      </DialogContent>
    </Dialog>
  )
}
export default CustomDialog
