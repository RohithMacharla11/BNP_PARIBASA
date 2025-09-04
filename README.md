# ApexBank - Unified Digital Banking Assistant

This is a modern, feature-rich digital banking application prototype built with Next.js and powered by Genkit for its AI capabilities. It serves as a comprehensive showcase of a modern banking interface.

## ✨ Features

- **Dashboard**: A quick overview of your total balance, monthly spending, savings, and income.
- **Transaction History**: A detailed and searchable list of all your transactions.
- **Payments**: Easily send money to friends and family.
- **Cards Management**: View and manage your debit and credit cards, including security controls.
- **Digital Wallet**: A seamless e-wallet for quick payments and transfers.
- **Investment Portfolio**: Track the performance of your investments over time.
- **Credit Score Analysis**: View your credit score and get AI-powered tips for improvement.
- **AI Chat Assistant**: Get financial advice and scam warnings with a smart chatbot.
- **Voice Assistant**: Perform banking queries hands-free using your voice.



## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **UI Library**: [React](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **AI/Generative**: [Genkit](https://firebase.google.com/docs/genkit) with Google's Gemini models.

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/en) (version 20 or later recommended)
- [npm](https://www.npmjs.com/) (or another package manager like yarn or pnpm)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    You will need to create a `.env` file in the root of the project to store your API keys. You can copy the example file to get started:
    ```bash
    cp .env.example .env
    ```
    Then, open the `.env` file and add your Google AI API key:
    ```
    GEMINI_API_KEY=your_google_ai_api_key_here
    ```

### Running the Application

This project consists of two main parts: the Next.js frontend and the Genkit AI flows. You'll need to run both concurrently in separate terminal windows.

1.  **Run the Next.js development server:**
    ```bash
    npm run dev
    ```
    Your application will be available at [http://localhost:9002](http://localhost:9002).

2.  **Run the Genkit development server:**
    In a new terminal window, run the following command to start the Genkit flows:
    ```bash
    npm run genkit:dev
    ```
    This will start the Genkit development environment, allowing the Next.js app to communicate with the AI models.
