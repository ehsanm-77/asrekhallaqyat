import { Modal } from '@mui/material';
import { styled } from '@mui/system';

export const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContent = styled('div')`
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  width: 400px;

  form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;

export const ImageContainer = styled('div')`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ImagePreview = styled('img')`
  max-width: 200px;
  max-height: 200px;
`;
