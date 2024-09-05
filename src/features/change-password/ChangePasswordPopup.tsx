'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ChangePasswordForm } from './ChangePasswordForm';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';

export const ChangePasswordPopup = () => {
  return (
    <Dialog open>
      <DialogDescription>Change password</DialogDescription>
      <DialogContent removeCross>
        <DialogTitle>Change password</DialogTitle>
        <ChangePasswordForm />
      </DialogContent>
    </Dialog>
  );
};
