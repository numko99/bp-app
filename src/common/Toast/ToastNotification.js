import { toast } from 'react-toastify';

export const notify = (toaster) => {
    if (toaster.type === 'success') {
        toast.success(toaster.message);
    }
    else if (toaster.type === 'error') {
        toast.error(toaster.message);
    }
}
