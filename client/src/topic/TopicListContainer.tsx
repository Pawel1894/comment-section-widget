import { useTopicsQuery } from "./hooks/use-topic-query";
import { useState } from "react";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { TopicItem } from "./TopicItem";
import { TopicSearch } from "./TopicSearch";
import { TopicList } from "./TopicList";
import { CreateTopic } from "./CreateTopic";

import styles from "./TopicListContainer.module.css";

export const TopicListContainer = () => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 300);

  const { data, error, isPlaceholderData, isLoading, isSuccess } = useTopicsQuery(debouncedQuery);

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }

  const errorMessage = error && <div>Oop, something went wrong. Could not get topics for you.</div>;

  const topicsContent = isSuccess && (
    data?.length === 0 ? (
      <div>No topics found</div>
    ) : (
      <TopicList>
        {data?.map((topic) => (
          <TopicItem key={topic.id} id={topic.id} content={topic.content} />
        ))}
      </TopicList>
    )
  );

  return (
    <>
      <h3 className={styles.title}>List of uploaded topics</h3>
      <div className={styles.container}>
        <div className={styles.header}>
          <TopicSearch onChange={handleSearch} showLoading={isLoading || isPlaceholderData} />
          <CreateTopic />
        </div>
        {errorMessage}
        {topicsContent}
      </div>
    </>
  );
};
