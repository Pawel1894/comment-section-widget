import { CommentsContainer } from '@/components/comment/CommentsContainer';
import { Topic } from '@topic/Topic';
import { NavigateBackButton } from '@/components/ui/navigate-back-button/NavigateBackButton';
import { useParams } from 'react-router-dom';

import styles from './TopicPage.module.css';

export const TopicPage = () => {
  const { id } = useParams<{ id: string }>();

  if(!id) {
    return <div>Invalid Id</div>
  }


  return (
    <div className={styles.layout}>
      <div className={styles.heading}>
        <NavigateBackButton />
        <Topic id={id} />
      </div>
      <CommentsContainer topicId={id} />
    </div>
  );
};
