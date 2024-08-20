import { Button } from "@ui/button/Button"
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
    
    if(!topic) return;
    
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

  return <Button variant="contained" disabled={isPending} onClick={onClick}>Create new topic</Button>
}