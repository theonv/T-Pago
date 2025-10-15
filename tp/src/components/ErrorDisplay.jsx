/**
 * 🎨 Componentes para exibição de erros da API
 * 
 * Componentes visuais para mostrar erros de forma clara e amigável
 */

'use client';
import React from 'react';

/**
 * Alerta de erro geral (topo do formulário)
 */
export const ErrorAlert = ({ message, onClose, type = 'error' }) => {
  if (!message) return null;
  
  const styles = {
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: '❌'
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800',
      icon: '⚠️'
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      icon: 'ℹ️'
    },
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      icon: '✅'
    }
  };
  
  const style = styles[type] || styles.error;
  
  return (
    <div 
      className={`${style.bg} border ${style.border} ${style.text} px-4 py-3 rounded-xl mb-4 flex items-start gap-3 animate-slideDown`}
      role="alert"
    >
      <span className="text-xl flex-shrink-0">{style.icon}</span>
      <div className="flex-1">
        <p className="font-medium text-sm">{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 text-lg hover:opacity-70 transition-opacity"
          aria-label="Fechar"
        >
          ×
        </button>
      )}
    </div>
  );
};

/**
 * Lista de erros de validação de campos
 */
export const ValidationErrors = ({ errors, onFieldClick }) => {
  const errorEntries = Object.entries(errors || {});
  
  if (errorEntries.length === 0) return null;
  
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
      <div className="flex items-start gap-3">
        <span className="text-xl">⚠️</span>
        <div className="flex-1">
          <p className="font-medium text-red-800 mb-2">
            Corrija os seguintes erros:
          </p>
          <ul className="space-y-1">
            {errorEntries.map(([field, message]) => (
              <li
                key={field}
                className="text-sm text-red-700 flex items-start gap-2 cursor-pointer hover:text-red-900"
                onClick={() => onFieldClick && onFieldClick(field)}
              >
                <span className="text-red-400">•</span>
                <span>
                  <strong className="capitalize">{field}</strong>: {message}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

/**
 * Toast de erro (notificação flutuante)
 */
export const ErrorToast = ({ message, onClose, duration = 5000 }) => {
  const [isVisible, setIsVisible] = React.useState(true);
  
  React.useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onClose && onClose(), 300);
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);
  
  if (!message || !isVisible) return null;
  
  return (
    <div className="fixed top-4 right-4 z-50 animate-slideInRight">
      <div className="bg-red-500 text-white px-6 py-4 rounded-xl shadow-lg flex items-center gap-3 max-w-md">
        <span className="text-2xl">❌</span>
        <p className="flex-1 text-sm font-medium">{message}</p>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(() => onClose && onClose(), 300);
          }}
          className="text-2xl hover:opacity-70 transition-opacity"
          aria-label="Fechar"
        >
          ×
        </button>
      </div>
    </div>
  );
};

/**
 * Erro inline (abaixo de cada campo)
 */
export const InlineError = ({ message, touched }) => {
  if (!message || !touched) return null;
  
  return (
    <div className="flex items-center gap-2 mt-1 text-red-600 animate-fadeIn">
      <svg
        className="w-4 h-4 flex-shrink-0"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
      <span className="text-sm">{message}</span>
    </div>
  );
};

/**
 * Modal de erro (para erros críticos)
 */
export const ErrorModal = ({ message, title = 'Erro', onClose, actions }) => {
  if (!message) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-scaleIn">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <span className="text-3xl">❌</span>
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          </div>
        </div>
        
        <div className="p-6">
          <p className="text-gray-700">{message}</p>
        </div>
        
        <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
          {actions ? (
            actions
          ) : (
            <button
              onClick={onClose}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Fechar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Banner de erro de conexão (fixo no topo)
 */
export const ConnectionErrorBanner = ({ onRetry }) => {
  return (
    <div className="bg-red-500 text-white py-3 px-4 text-center">
      <div className="flex items-center justify-center gap-3 flex-wrap">
        <span className="text-lg">🔌</span>
        <p className="text-sm font-medium">
          Sem conexão com o servidor. Verifique sua internet.
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-white text-red-500 px-4 py-1 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors"
          >
            Tentar novamente
          </button>
        )}
      </div>
    </div>
  );
};

/**
 * Card de estado vazio/erro
 */
export const ErrorState = ({ 
  title = 'Algo deu errado',
  message = 'Não foi possível carregar os dados.',
  onRetry,
  icon = '😔'
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <span className="text-6xl mb-4">{icon}</span>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-colors"
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
};

/**
 * Componente completo de gerenciamento de erros
 * Combina todos os tipos de exibição
 */
export const ErrorDisplay = ({ 
  error, 
  fieldErrors, 
  onClose,
  onFieldFocus,
  showToast = false,
  showModal = false
}) => {
  if (!error && (!fieldErrors || Object.keys(fieldErrors).length === 0)) {
    return null;
  }
  
  // Exibe modal para erros críticos
  if (showModal && error) {
    return <ErrorModal message={error} onClose={onClose} />;
  }
  
  // Exibe toast para notificações rápidas
  if (showToast && error) {
    return <ErrorToast message={error} onClose={onClose} />;
  }
  
  // Exibe alerta padrão
  return (
    <>
      {error && <ErrorAlert message={error} onClose={onClose} />}
      {fieldErrors && Object.keys(fieldErrors).length > 0 && (
        <ValidationErrors errors={fieldErrors} onFieldClick={onFieldFocus} />
      )}
    </>
  );
};

// Estilos de animação (adicionar ao globals.css)
export const errorAnimationStyles = `
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-slideDown {
  animation: slideDown 0.3s ease-out;
}

.animate-slideInRight {
  animation: slideInRight 0.3s ease-out;
}

.animate-fadeIn {
  animation: fadeIn 0.2s ease-out;
}

.animate-scaleIn {
  animation: scaleIn 0.3s ease-out;
}
`;

export default {
  ErrorAlert,
  ValidationErrors,
  ErrorToast,
  InlineError,
  ErrorModal,
  ConnectionErrorBanner,
  ErrorState,
  ErrorDisplay
};
