import {Tape} from 'src/components';
import {BaseLayout} from '../layouts';
import {useLocation, useSearchParams} from 'react-router-dom';
import {useAppDispatch} from 'src/shared/model';
import {changeType} from 'src/shared/model/slices/tape/tapeSlice';
import {useEffect} from 'react';
import {nextPage} from 'src/shared/model/slices/tape/actions';

export function Home() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (location.pathname === '/') {
      const query = searchParams.get('query');
      if (query) {
        dispatch(changeType({type: 'search', query: query}));
      } else dispatch(changeType('trending'));
    } else if (location.pathname === '/likes') {
      dispatch(changeType('likes'));
    }
    dispatch(nextPage({limit: 15}));
  }, [location, searchParams, dispatch]);
  return (
    <BaseLayout>
      <Tape />
    </BaseLayout>
  );
}
