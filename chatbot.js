// Demo FAQ Chatbot
const faq = {
  "What are your opening hours?": "We are open Mon-Sun from 8 AM to 10 PM.",
  "Where is the cafe located?": "123 Main Street, Your City.",
  "Do you offer online orders?": "Yes, you can order directly from our website.",
  "Do you have vegan options?": "Yes, we have vegan pastries and drinks available.",
  "Do you accept reservations?": "Yes, please call us to reserve a table."
};

const chatBubble = document.getElementById('chat-bubble');
const chatWindow = document.getElementById('faq-chatbot');
const closeChat = document.getElementById('close-chat');
const messagesDiv = document.getElementById('messages');
const input = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const faqBtns = document.querySelectorAll('.faq-btn');

chatBubble.addEventListener('click', () => {
  chatWindow.style.display = 'flex';
});

closeChat.addEventListener('click', () => {
  chatWindow.style.display = 'none';
});

function addMessage(text, sender) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message', sender === 'user' ? 'user-msg' : 'bot-msg');
  msgDiv.textContent = text;
  messagesDiv.appendChild(msgDiv);

  // Scroll to bottom
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function fallback(userQuestion) {
  addMessage("Sorry, I don't know the answer. We'll get back to you soon.", "bot");
  addMessage("Your question has been recorded: " + userQuestion, "bot");
}

// FAQ button click
faqBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const question = btn.textContent;
    addMessage(question, 'user');
    addMessage(faq[question], 'bot');
    addMessage("Was this helpful? 👍 / 👎", 'bot');
  });
});

// Send typed input
sendBtn.addEventListener('click', () => {
  const userText = input.value.trim();
  if(!userText) return;
  addMessage(userText, 'user');
  input.value = '';
  if(faq[userText]){
    addMessage(faq[userText], 'bot');
    addMessage("Was this helpful? 👍 / 👎", 'bot');
  } else {
    fallback(userText);
  }
});

input.addEventListener('keypress', e => {
  if(e.key === 'Enter') sendBtn.click();
});