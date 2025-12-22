import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './Dialog';
import { Button } from './Button';

const ConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    confirmText = "Confirm",
    cancelText = "Cancel",
    variant = "destructive"
}) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button variant="secondary" onClick={() => onClose(false)}>
                    {cancelText}
                </Button>
                <Button variant={variant} onClick={() => {
                    onConfirm();
                    onClose(false);
                }}>
                    {confirmText}
                </Button>
            </DialogFooter>
        </Dialog>
    );
};

export default ConfirmationModal;
