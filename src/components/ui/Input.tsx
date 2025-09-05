import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  hint,
  icon,
  fullWidth = true,
  type = 'text',
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [inputType, setInputType] = React.useState(type);
  
  React.useEffect(() => {
    if (type === 'password') {
      setInputType(showPassword ? 'text' : 'password');
    } else {
      setInputType(type);
    }
  }, [type, showPassword]);
  
  const baseStyles = 'block px-3 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500';
  const errorStyles = error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : '';
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            {icon}
          </div>
        )}
        
        <input
          type={inputType}
          className={`${baseStyles} ${errorStyles} ${widthClass} ${icon ? 'pl-10' : ''} ${type === 'password' ? 'pr-10' : ''} ${className}`}
          {...props}
        />
        
        {type === 'password' && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      
      {hint && !error && (
        <p className="mt-1 text-sm text-gray-500">{hint}</p>
      )}
    </div>
  );
};

export default Input;