import { FC } from "react";
import { useTopicQuery } from "./hooks/use-topic-query";
import { TopicTitle } from "./TopicTitle";

type TopicProps = {
  id: string;
}

export const Topic: FC<TopicProps> = ({ id }) => {
  const { data } = useTopicQuery(id);

  return (
    <div>
      <TopicTitle>
        {data?.content}
      </TopicTitle>
    </div>
  );
}