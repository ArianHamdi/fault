import PromptSync from "prompt-sync";
const prompt = PromptSync();

const input = question => {
    const answer = prompt(question);
    return answer;
}

export default input