import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
        errorInfo: null
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error, errorInfo: null };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ errorInfo });
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center justify-center">
                    <h1 className="text-4xl font-bold text-red-500 mb-4">Something went wrong</h1>
                    <div className="bg-black p-6 rounded-lg border border-red-900 max-w-2xl w-full overflow-auto">
                        <h2 className="text-xl font-bold text-red-400 mb-2">Error:</h2>
                        <pre className="text-sm font-mono whitespace-pre-wrap text-gray-300 mb-4">
                            {this.state.error && this.state.error.toString()}
                        </pre>
                        <h2 className="text-xl font-bold text-red-400 mb-2">Stack Trace:</h2>
                        <pre className="text-xs font-mono whitespace-pre-wrap text-gray-500">
                            {this.state.errorInfo && this.state.errorInfo.componentStack}
                        </pre>
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-bold"
                    >
                        Reload Application
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
