'use client';

import React, {Component, ReactNode} from 'react';
import {ErrorComponent} from '../ErrorComponent';

interface ErrorBoundaryProps {
    children: ReactNode
    Fallback: ({error}: { error: Error }) => React.JSX.Element
}

interface ErrorBoundaryState {
    hasError: boolean
    error: Error
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {

    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {hasError: false, error: new Error()};
    }

    static getDerivedStateFromError(error) {
        // Update state so react shows the fallback UI
        return {hasError: true};
    }

    componentDidCatch(error, _errorInfo) {
        // Log the error to an error reporting service console
        this.setState({error});
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <this.props.Fallback error={this.state.error}/>
        }

        return this.props.children;
    }
}

export function ErrorBoundaryClient({children}: { children: React.ReactNode }) {
    return (
        <ErrorBoundary Fallback={({error}) => <ErrorComponent>{error.message}</ErrorComponent>}>
            {children}
        </ErrorBoundary>
    );
}
