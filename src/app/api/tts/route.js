import { PassThrough } from "stream";

function speak() {
  const utterance = new SpeechSynthesisUtterance(req.nextUrl.searchParams.get("text") || "I'm excited to try text to speech");
  const voices = speechSynthesis.getVoices();
  const teacher = req.nextUrl.searchParams.get("teacher") || "Nanami";

  // Find a voice based on the teacher parameter
  const selectedVoice = voices.find(voice => voice.name === `ja-JP-${teacher}Neural`);
  utterance.voice = selectedVoice || voices[0]; // Choose a specific voice or use the first available

  // Speak the text
  speechSynthesis.speak(utterance);
}

export async function GET(req) {
  // WARNING: Do not expose your keys
  // WARNING: If you host publicly your project, add an authentication layer to limit the consumption of Azure resources

  // Call the speak function to generate speech
  speak();

  // As the speech is asynchronous, we can create a dummy response for now
  const response = new Response("Generating speech...", {
    headers: {
      "Content-Type": "text/plain",
    },
  });

  return response;
}
