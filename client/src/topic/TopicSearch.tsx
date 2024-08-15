import { FC } from "react";
import { Oval } from "react-loader-spinner";
import { Input } from "@/components/input/Input";

import styles from './TopicSearch.module.css';

type TopicSearchProps = {
  showLoading: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const TopicSearch: FC<TopicSearchProps> = ({ showLoading, onChange }) => {
  return (
    <div className={styles.container}>
      <Input placeholder="search" onChange={onChange} />
      <div className={styles.loader}>
        <Oval
          height="30"
          width="30"
          visible={showLoading}
          color="#4b1e8e"
          secondaryColor="#4e31aa"
        />
      </div>
    </div>
  );
};
