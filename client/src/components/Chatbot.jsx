import { useState } from "react";

export default function Chatbot({ onClose }) {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi there! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  // Large FAQ database (150 questions)
  const faq = {
    "what food is best for puppies":
      "Puppies need high-quality puppy food rich in protein and DHA for healthy growth.",
    "how often should i feed my dog":
      "Adult dogs usually need 2 meals a day. Puppies may need 3–4 smaller meals.",
    "can cats drink cows milk":
      "Most cats are lactose intolerant, so cow’s milk can upset their stomach.",
    "how often should i bathe my dog":
      "Once every 4–6 weeks is fine, unless your dog gets especially dirty.",
    "why does my dog eat grass":
      "Dogs may eat grass for digestion or boredom. Occasional grass-eating is normal.",
    "how often should i walk my dog":
      "At least twice a day for 20–30 minutes, depending on breed and age.",
    "can dogs eat chocolate":
      "No. Chocolate is toxic to dogs and can be very dangerous.",
    "what to do if my dog has ticks":
      "Remove ticks carefully with tweezers and consult your vet for prevention methods.",
    "how often should i clean the litter box":
      "Scoop daily and fully clean the litter box once a week.",
    "what human foods are toxic to pets":
      "Foods like chocolate, onions, garlic, grapes, and raisins are toxic to pets.",

    // --- Section: Dog Health & Care ---
    "how do i brush my dogs teeth":
      "Use a dog toothbrush and toothpaste. Brush a few times a week to prevent dental disease.",
    "what vaccines do dogs need":
      "Core vaccines include rabies, distemper, parvovirus, and adenovirus.",
    "how do i know if my dog has worms":
      "Look for symptoms like weight loss, diarrhea, visible worms in stool, or scooting.",
    "what to do if my dog has diarrhea":
      "Offer plain boiled chicken and rice. If diarrhea lasts more than 24 hours, see a vet.",
    "why is my dog scratching a lot":
      "It could be fleas, allergies, or dry skin. A vet exam is recommended.",
    "when should i spay or neuter my dog":
      "Typically around 6–9 months old, but consult your vet for the best timing.",
    "can dogs get covid":
      "Dogs can test positive for COVID-19 but it is very rare and usually mild.",
    "what is the average lifespan of a dog":
      "Most dogs live 10–13 years depending on breed and health.",
    "how do i clip my dogs nails":
      "Use dog nail clippers and avoid cutting the quick. Trim every 3–4 weeks.",
    "how to stop my dog from barking too much":
      "Provide training, mental stimulation, and rule out health or anxiety issues.",

    // --- Section: Cat Health & Care ---
    "how do i litter train a kitten":
      "Place them in the litter box after meals and naps. Keep the box clean and accessible.",
    "how often should i feed my cat":
      "Adult cats do well on 2 meals per day. Free feeding is also an option for some cats.",
    "should i keep my cat indoors":
      "Indoor cats live longer and safer lives, but enrichment is important.",
    "why does my cat knead":
      "Kneading is a sign of comfort and affection, often from kitten behavior.",
    "why does my cat purr":
      "Cats purr when they are content, but also sometimes when stressed or in pain.",
    "what vaccines do cats need":
      "Core vaccines include rabies, feline distemper, calicivirus, and herpesvirus.",
    "why is my cat shedding so much":
      "Shedding is natural but can increase with stress, diet issues, or health problems.",
    "how do i stop my cat from scratching furniture":
      "Provide scratching posts, use deterrent sprays, and trim claws regularly.",
    "should i declaw my cat":
      "Declawing is not recommended. It is painful and can cause long-term problems.",
    "how long do cats live":
      "Indoor cats live 12–18 years on average, sometimes into their 20s.",

    // --- Section: Nutrition ---
    "can dogs eat rice":
      "Yes, plain cooked rice is safe and often used for upset stomachs.",
    "can dogs eat bones":
      "Cooked bones are dangerous. Raw bones may be okay under supervision.",
    "can cats eat tuna":
      "Occasional tuna is fine, but it should not be the main diet.",
    "can dogs eat eggs": "Yes, cooked eggs are a good protein source.",
    "can dogs eat bread":
      "Plain bread is safe in small amounts but not nutritious.",
    "can dogs eat peanut butter":
      "Yes, as long as it does not contain xylitol, which is toxic.",
    "can cats eat cheese": "Most cats are lactose intolerant, so avoid cheese.",
    "can dogs eat apples": "Yes, remove seeds and core before feeding apples.",
    "can dogs eat grapes": "No, grapes and raisins are toxic to dogs.",
    "what foods help shiny coat for pets":
      "Omega-3 fatty acids, fish oil, and balanced protein help maintain a healthy coat.",

    // --- Section: Training & Behavior ---
    "how do i potty train a puppy":
      "Take them outside frequently and reward success. Be patient and consistent.",
    "how to crate train a dog":
      "Introduce the crate gradually, make it positive, and never use it as punishment.",
    "why does my dog chew everything":
      "Chewing is natural. Provide toys and supervise to prevent destructive chewing.",
    "how do i train my dog to sit":
      "Hold a treat above their nose and move it back. Say 'sit' and reward when they sit.",
    "why does my cat meow so much":
      "Cats meow for attention, food, or discomfort. Ensure basic needs are met.",
    "why is my dog aggressive":
      "Aggression may stem from fear, pain, or poor socialization. Seek professional help.",
    "how do i socialize my puppy":
      "Expose them gradually to people, pets, and environments between 3–14 weeks old.",
    "why does my dog dig":
      "Dogs dig for fun, instinct, or to cool off. Provide toys and exercise.",
    "how to stop my dog from jumping on people":
      "Ignore jumping, reward calm behavior, and teach 'sit' for greetings.",
    "why does my cat hide a lot":
      "Cats hide when stressed, sick, or seeking comfort. Monitor for other symptoms.",

    // --- Section: Emergency Care ---
    "what to do if my dog is choking":
      "Check their mouth and perform the Heimlich maneuver if needed. See a vet immediately.",
    "what to do if my cat stops eating":
      "If your cat refuses food for more than 24 hours, consult a vet.",
    "what to do if my dog is vomiting":
      "Withhold food for 12 hours, offer water. If it continues, see a vet.",
    "how do i know if my pet has heatstroke":
      "Signs include heavy panting, drooling, lethargy, and collapse. Cool them and get to a vet fast.",
    "what to do if my pet eats something toxic":
      "Call your vet or a poison control line immediately. Do not wait.",
    "how do i check my pets temperature":
      "Use a digital rectal thermometer. Normal for dogs and cats is 100–102.5°F.",
    "what to do if my dog has a seizure":
      "Keep them safe, do not touch their mouth, and call a vet immediately.",
    "what are signs of dehydration in pets":
      "Dry gums, loss of skin elasticity, lethargy, and sunken eyes.",
    "what to do if my cat has fleas":
      "Use flea treatment from your vet and clean your home thoroughly.",
    "what to do if my dog has an allergic reaction":
      "Swelling, itching, or difficulty breathing needs urgent vet care.",

    // --- Section: General Pet Care ---
    "how often should i take my pet to the vet":
      "At least once a year for a checkup, more often for seniors or sick pets.",
    "what is microchipping":
      "Microchipping is a permanent ID for pets to help reunite lost animals with owners.",
    "should i get pet insurance":
      "Pet insurance can help cover unexpected medical costs.",
    "how do i brush my cats fur":
      "Use a soft brush regularly, especially for long-haired cats.",
    "what are signs of pain in pets":
      "Changes in behavior, limping, hiding, reduced appetite, or aggression.",
    "how can i exercise my cat":
      "Use toys, climbing trees, and interactive play daily.",
    "how can i keep my dog entertained":
      "Provide toys, puzzles, training, and walks.",
    "why does my dog lick me":
      "Dogs lick to show affection, taste, or seek attention.",
    "why does my cat bring me dead animals":
      "It is a hunting instinct and a way of sharing with their family.",
    "why does my dog follow me everywhere":
      "Dogs are pack animals and follow for security, affection, or habit.",
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages([...messages, { from: "user", text: userMessage }]);

    // Bot reply logic
    setTimeout(() => {
      const lowerInput = userMessage.toLowerCase();
      let reply = "Thanks for your query! Our team will reach out shortly.";

      // Match FAQ
      for (const question in faq) {
        if (lowerInput.includes(question)) {
          reply = faq[question];
          break;
        }
      }

      setMessages((prev) => [...prev, { from: "bot", text: reply }]);
    }, 800);

    setInput("");
  };

  return (
    <div className="fixed bottom-20 right-6 w-80 bg-white border border-gray-300 rounded-xl shadow-lg flex flex-col">
      {/* Header */}
      <div className="bg-[#f2c4bb] text-white p-3 flex justify-between items-center rounded-t-xl">
        <span className="font-semibold">PetCare Chat</span>
        <button onClick={onClose} className="font-bold">
          ✕
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 h-64">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg max-w-[70%] ${
              msg.from === "bot"
                ? "bg-gray-200 text-gray-800 self-start"
                : "bg-[#f2c4bb] text-white self-end ml-auto"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-2 flex gap-2 border-t">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type here..."
          className="flex-1 border rounded-lg px-2 py-1 focus:outline-none"
        />
        <button
          onClick={handleSend}
          className="bg-[#f2c4bb] text-white px-3 py-1 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}
