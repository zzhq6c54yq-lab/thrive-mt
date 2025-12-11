import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle2, XCircle, Loader2, Mail } from "lucide-react";

export default function TherapistReset() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('No reset token provided. Please check your email link.');
      return;
    }
    
    verifyToken();
  }, [token]);

  const verifyToken = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('verify-therapist-reset', {
        body: { token }
      });

      if (error) {
        throw error;
      }

      if (data?.error) {
        setStatus('error');
        if (data.code === 'INVALID_TOKEN') {
          setMessage('This reset link is invalid or has expired. Please request a new one.');
        } else {
          setMessage(data.error);
        }
        return;
      }

      setStatus('success');
      setMessage('Your rate limit has been cleared successfully! You can now try logging in again.');
      
    } catch (error: any) {
      console.error('Token verification error:', error);
      setStatus('error');
      setMessage(error.message || 'Failed to verify reset token. Please try again.');
    }
  };

  const handleGoToLogin = () => {
    navigate('/app/auth');
  };

  const handleRequestNewLink = () => {
    navigate('/app/auth');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
        {status === 'loading' && (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
              <Loader2 className="h-10 w-10 text-purple-600 animate-spin" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Verifying Reset Link
              </h1>
              <p className="text-gray-600">
                Please wait while we verify your reset token...
              </p>
            </div>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Reset Successful!
              </h1>
              <p className="text-gray-600 mb-6">
                {message}
              </p>
            </div>
            <Button 
              onClick={handleGoToLogin}
              className="w-full bg-purple-600 hover:bg-purple-700"
              size="lg"
            >
              Go to Login
            </Button>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <XCircle className="h-10 w-10 text-red-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Reset Failed
              </h1>
              <p className="text-gray-600 mb-6">
                {message}
              </p>
            </div>
            <div className="space-y-3">
              <Button 
                onClick={handleRequestNewLink}
                className="w-full bg-purple-600 hover:bg-purple-700"
                size="lg"
              >
                <Mail className="mr-2 h-4 w-4" />
                Request New Reset Link
              </Button>
              <Button 
                variant="outline"
                onClick={handleGoToLogin}
                className="w-full"
                size="lg"
              >
                Back to Home
              </Button>
            </div>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-center text-gray-500">
            If you continue to experience issues, please contact support.
          </p>
        </div>
      </div>
    </div>
  );
}
