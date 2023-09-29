import { toast } from "react-toastify";

export const useToastie = () => {
  const success = (text: string) => toast.success(text);
  const error = (text: string) => toast.error(text);
  return { success, error };
};
