import { Topic } from '@topic/Topic';
import { useParams } from 'react-router-dom';

export const TopicPage = () => {
  const { id } = useParams<{ id: string }>();

  if(!id) {
    return <div>Invalid Id</div>
  }


  return (
    <Topic id={id} />
  );
};
