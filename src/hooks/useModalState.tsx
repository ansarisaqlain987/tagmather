import { useState } from "react"

export const useModalState = (defaultVaule: boolean = false) => {
    const [isOpen, setOpen] = useState(defaultVaule);
    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);
    const updateModalState = (val: boolean) => setOpen(val);
    return {
        isOpen,
        openModal,
        closeModal,
        updateModalState
    } 
}