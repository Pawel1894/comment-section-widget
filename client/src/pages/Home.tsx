import { TopicListContainer } from "@/topic/TopicListContainer"

import styles from './Home.module.css'

export const Home = () => {
  return (
    <div className={styles.container}>
      <TopicListContainer />
    </div>
  )
}
