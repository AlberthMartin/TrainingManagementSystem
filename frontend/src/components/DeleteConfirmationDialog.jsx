import React from "react";
import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";

export default function DeleteConfirmationDialog({
  isOpen,
  onClose,
  onDelete,
  itemToBeDeleted,
}) {
  const handleDelete = () => {
    if (onDelete) onDelete();
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };
  return (
    <Dialog.Root
      role="alertdialog"
      open={isOpen}
      onOpenChange={(e) => !e.open && onClose()}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Are you sure?</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <p>
                This action cannot be undone. This will permanently delete your
                <strong> {itemToBeDeleted}</strong> and remove your data from
                our systems.
              </p>
            </Dialog.Body>
            <Dialog.Footer>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button colorPalette="red" onClick={handleDelete}>
                Delete
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
