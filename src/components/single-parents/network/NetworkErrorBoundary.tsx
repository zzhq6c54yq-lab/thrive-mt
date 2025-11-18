import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw, ArrowLeft } from 'lucide-react';
import useTranslation from '@/hooks/useTranslation';

interface Props {
  children: ReactNode;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class NetworkErrorBoundaryClass extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Network feature error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} onReset={this.handleReset} />;
    }

    return this.props.children;
  }
}

const ErrorFallback: React.FC<{ error?: Error; onReset: () => void }> = ({ error, onReset }) => {
  const { isSpanish } = useTranslation();
  
  const isTableMissing = error?.message?.includes('relation') || 
                         error?.message?.includes('does not exist');

  return (
    <Card className="p-8 text-center space-y-4 bg-card/50 backdrop-blur-sm">
      <div className="flex justify-center">
        <AlertCircle className="w-16 h-16 text-rose-500/70" />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-foreground">
          {isSpanish ? "No se pudo cargar esta función" : "Unable to load this feature"}
        </h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          {isTableMissing
            ? isSpanish
              ? "Esta función aún no está configurada. Contacte al administrador para configurar la red de padres."
              : "This feature is not set up yet. Contact your administrator to configure the parent network."
            : isSpanish
              ? "Ocurrió un error al cargar los datos. Por favor, intenta de nuevo."
              : "An error occurred while loading data. Please try again."}
        </p>
        {error && (
          <details className="text-xs text-muted-foreground/70 mt-2">
            <summary className="cursor-pointer hover:text-muted-foreground">
              {isSpanish ? "Detalles técnicos" : "Technical details"}
            </summary>
            <pre className="mt-2 p-2 bg-muted/30 rounded text-left overflow-auto max-h-32">
              {error.message}
            </pre>
          </details>
        )}
      </div>

      <div className="flex gap-3 justify-center">
        <Button
          variant="outline"
          onClick={() => window.history.back()}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          {isSpanish ? "Volver" : "Go Back"}
        </Button>
        <Button
          onClick={onReset}
          className="gap-2 bg-rose-500 hover:bg-rose-600 text-white"
        >
          <RefreshCw className="w-4 h-4" />
          {isSpanish ? "Reintentar" : "Retry"}
        </Button>
      </div>
    </Card>
  );
};

// Wrapper component to use hooks
const NetworkErrorBoundary: React.FC<Props> = ({ children, onReset }) => {
  return (
    <NetworkErrorBoundaryClass onReset={onReset}>
      {children}
    </NetworkErrorBoundaryClass>
  );
};

export default NetworkErrorBoundary;
