# GENAI-PROTOTYPE

A cutting-edge prototype application built to explore the capabilities and applications of Generative AI. This project serves as a playground for experimenting with large language models (LLMs), prompt engineering, and AI-powered workflows.

![Python](https://img.shields.io/badge/Python-3.8%2B-blue)
![Framework](https://img.shields.io/badge/Framework-Streamlit-FF4B4B)
![License](https://img.shields.io/badge/License-MIT-green)
![Status](https://img.shields.io/badge/Status-Prototype-yellow)

**Live Demo**: [Try the GENAI-PROTOTYPE App!](https://splendid-shortbread-d7d43b.netlify.app) 
<img width="1600" height="944" alt="image" src="https://github.com/user-attachments/assets/35c690c0-1b80-4c1a-a444-5f795d5e8ca9" />

<img width="1600" height="902" alt="image" src="https://github.com/user-attachments/assets/e65cd671-ab90-4dd1-bf33-1cca498eb446" />



## ✨ Features

- **Interactive Chat Interface**: Converse with different AI models in a clean, web-based UI.
- **Multi-Model Support**: Switch between various LLMs (e.g., OpenAI GPT, Claude, Llama 2) to compare outputs.
- **Prompt Playground**: Experiment with system prompts, parameters (temperature, top_p), and see results in real-time.
- **Document Analysis**: Upload documents (PDF, TXT) and let the AI summarize or answer questions about the content.
- **Code Generation & Explanation**: Generate code snippets or get explanations for complex programming concepts.

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:
- Python 3.8 or higher
- `pip` (Python package manager)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/GENAI-PROTOTYPE.git
    cd GENAI-PROTOTYPE
    ```

2.  **Create a virtual environment** (Recommended)
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    ```

3.  **Install dependencies**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Set up your API keys**
    Create a `.env` file in the root directory and add your keys. Get your API keys from the respective providers.
    ```ini
    # .env
    OPENAI_API_KEY=your_openai_api_key_here
    ANTHROPIC_API_KEY=your_anthropic_api_key_here
    # Add other API keys as needed
    ```
    *Never commit your `.env` file! It is included in `.gitignore`.*

### Usage

1.  **Run the application**
    ```bash
    streamlit run app/main.py
    ```
2.  **Open your browser** and go to `http://localhost:8501`.
3.  **Start experimenting!** Select a model, type a prompt, and see the AI generate a response.

## 📁 Project Structure
