# University of Swat Assist Bot

A professional AI-powered chatbot for the University of Swat, designed to answer questions about admissions, fees, scholarships, departments, university rules, events, and more. Built with React, Flask, and Groq's large language models, this project provides a modern, branded, and context-aware assistant for students and visitors.

---

## Features

- **Conversational AI**: Natural language chat interface powered by Groq's GPT-OSS model.
- **Context-Aware**: Answers are generated using official university data from a structured JSON context file.
- **Modern UI**: Responsive, accessible, and university-branded interface using React and Tailwind CSS.
- **Smart Context Selection**: Only relevant context is sent to the AI based on user queries (e.g., "fees" questions only send fee info).
- **Streaming Responses**: Answers appear in real-time as they are generated.
- **Clear Chat**: Easily reset the conversation.
- **Contact Info**: Footer displays university contact and office hours.

---

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: Python, Flask, Groq API, dotenv
- **AI Model**: Groq GPT-OSS (`openai/gpt-oss-120b`)
- **Context**: JSON file (`backend/basic_context/basic_contect.json`)

---

## Getting Started

### Prerequisites

- Node.js (v18+)
- Python (v3.9+)
- [Groq API Key](https://console.groq.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/swat-assist-bot.git
cd swat-assist-bot
```

### 2. Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # On Windows
pip install -r requirements.txt
```

- Create a `.env` file in the `backend` folder:
  ```
  GROQ_API_KEY=your_groq_api_key_here
  ```
- Edit `basic_context/basic_contect.json` with your university data.

- Start the backend:
  ```bash
  python app.py
  ```

### 3. Frontend Setup

```bash
cd ..
npm install
npm run dev
```

The app will be available at [http://localhost:8080](http://localhost:8080).

---

## Project Structure

```
swat-assist-bot/
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── basic_context/
│       └── basic_contect.json
├── src/
│   ├── components/
│   ├── pages/
│   ├── assets/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── .env
├── vite.config.ts
└── README.md
```

---

## Customization

- **Branding**: Replace `src/assets/university-logo.png` and background images with your university's branding.
- **Context**: Update `backend/basic_context/basic_contect.json` with up-to-date university info.
- **Logic**: Enhance context selection logic in `app.py` to send only relevant context to Groq based on keywords.

---

## Example Usage

- **Ask about admissions:**  
  _"How do I apply for undergraduate programs?"_
- **Ask about fees:**  
  _"What is the fee structure for BS Computer Science?"_
- **Ask about scholarships:**  
  _"Are there any merit-based scholarships?"_

---

## License

This project is for educational and demonstration purposes. Please contact the University of Swat for official information.

---

## Credits

- University of Swat branding and data
- [Groq](https://groq.com/) for LLM API
- [React](https://react.dev/), [Flask](https://flask.palletsprojects.com/), [Tailwind CSS](https://tailwindcss.com/)

---

## Contact

For issues or contributions, please open an issue or pull