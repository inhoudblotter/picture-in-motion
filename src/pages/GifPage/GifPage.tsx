import {useParams} from 'react-router-dom';
import {BaseLayout} from '../layouts';
import {Footer, GifCard} from 'src/components';
import {useEffect} from 'react';
import {useAppDispatch} from 'src/shared/model';
import {loadGif} from 'src/shared/model/slices/gif/actions';

export function GifPage() {
  const params = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (params.id) dispatch(loadGif({id: params.id}));
  }, [params.id, dispatch]);
  return (
    <BaseLayout>
      <>
        <GifCard />
        <Footer />
      </>
    </BaseLayout>
  );
}
