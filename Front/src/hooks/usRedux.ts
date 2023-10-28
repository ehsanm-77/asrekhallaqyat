import { RootState } from '@/redux/store/store';
import { useSelector, useDispatch } from 'react-redux';

type SelectorMap = (state: RootState) => any;

const useRedux = (stateName: SelectorMap) => {
  const value = useSelector(stateName);

  const dispatch = useDispatch();
  return [value, dispatch];
};

export default useRedux;
