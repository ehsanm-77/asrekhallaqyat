import { useMutation, useQueryClient } from '@tanstack/react-query';
import editProductService from './editProductService';

function useEditSingleProduct({
  setOpen,
}: {
  setOpen: (arg: boolean) => void;
}) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => {
      return editProductService(id, data, setOpen);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['GetProduct'] });
    },
  });
}

export default useEditSingleProduct;
