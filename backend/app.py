import os
import json
import logging
from flask import Flask, request, Response, jsonify
from groq import Groq
from dotenv import load_dotenv
import traceback
import sys

# Log app startup
print("[INFO] Starting University of Swat Assistant Flask backend...", flush=True)

# Load environment variables from .env file
load_dotenv()

# Setup logging
logging.basicConfig(level=logging.INFO, stream=sys.stdout, force=True)
logger = logging.getLogger(__name__)

app = Flask(__name__)

# Load context from JSON file
CONTEXT_PATH = os.path.join(os.path.dirname(__file__), 'basic_context', 'basic_contect.json')
with open(CONTEXT_PATH, 'r', encoding='utf-8') as f:
    CONTEXT_DATA = json.load(f)

# Groq API key setup
GROQ_API_KEY = os.environ.get('GROQ_API_KEY')
GROQ_MODEL = 'openai/gpt-oss-120b'

# Groq client
client = Groq(api_key=GROQ_API_KEY)


@app.route('/api/generate', methods=['POST'])
def generate():
    try:
        data = request.get_json()
        user_message = data.get('message', '')
        logger.info(f"Received user message: {user_message}")
        sys.stdout.flush()

        # Professional system prompt using context
        system_prompt = (
            "You are a professional, helpful assistant for the University of Swat. "
            "Use ONLY the following context to answer user questions as accurately and concisely as possible. "
            "If the answer is not in the context, politely say you don't know or refer to the university help desk.\n\n"
            f"Context:\n{json.dumps(CONTEXT_DATA, indent=2)}"
        )

        completion = client.chat.completions.create(
            model=GROQ_MODEL,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_message}
            ],
            temperature=1,
            max_completion_tokens=300,
            top_p=1,
            reasoning_effort="medium",
            stream=True,
            stop=None
        )

        def generate_stream():
            for chunk in completion:
                content = chunk.choices[0].delta.content
                if content:
                    yield content
                sys.stdout.flush()

        return Response(generate_stream(), mimetype='text/plain')

    except Exception as e:
        logger.error(f"Groq API error: {e}\n{traceback.format_exc()}")
        sys.stdout.flush()
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)
