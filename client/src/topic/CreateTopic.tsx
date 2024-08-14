import { Button } from "@components/button/Button"
import { useCreateTopic } from './hooks/use-create-topic';
import { validateTopicInput } from "./topic-validation";
import { toast } from "@/toast";

export const CreateTopic = () => {
  const { mutate: createTopic, isPending } = useCreateTopic({
    onSuccess: () => toast.success("Topic created!"),
    onError: () => toast.error("Failed to create topic"),
  });

  function onClick() {
    const topic = prompt("Enter a topic name")
    
    handleCreateTopic(topic);
  }

  async function handleCreateTopic(topic?: string | null) {
    const validationResult = validateTopicInput(topic)

    if(validationResult.valid) {
      createTopic(validationResult.validatedValue);
    } else {
      toast.warn(validationResult.error);
    }
  }

  return <Button disabled={isPending} onClick={onClick}>Create Topic</Button>
}