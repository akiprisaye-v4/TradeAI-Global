import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0D1117',
          color: '#E6EDF3',
          padding: '40px 20px'
        }}>
          <div style={{
            maxWidth: '600px',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '64px',
              marginBottom: '24px'
            }}>⚠️</div>
            <h1 style={{
              fontSize: '28px',
              marginBottom: '16px',
              color: '#FF9900'
            }}>Une erreur est survenue</h1>
            <p style={{
              color: '#8B949E',
              marginBottom: '24px',
              lineHeight: 1.6
            }}>
              Nous sommes désolés pour ce désagrément. Veuillez recharger la page ou contacter le support si le problème persiste.
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #FF9900 0%, #FFB800 100%)',
                border: 'none',
                borderRadius: '8px',
                color: '#0D1117',
                fontWeight: 700,
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(255,153,0,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Recharger la page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default React.memo(ErrorBoundary);
