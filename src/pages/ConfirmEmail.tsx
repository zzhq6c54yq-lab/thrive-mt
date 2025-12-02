import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const ConfirmEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const token_hash = searchParams.get('token_hash');
    const type = searchParams.get('type');

    if (!token_hash || type !== 'email') {
      setStatus('error');
      setMessage('Invalid confirmation link. Please check your email and try again.');
      return;
    }

    verifyEmail(token_hash);
  }, [searchParams]);

  useEffect(() => {
    if (status === 'success' && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (status === 'success' && countdown === 0) {
      navigate('/app/dashboard');
    }
  }, [status, countdown, navigate]);

  const verifyEmail = async (token: string) => {
    try {
      const { error } = await supabase.auth.verifyOtp({
        token_hash: token,
        type: 'email'
      });

      if (error) {
        setStatus('error');
        if (error.message.includes('expired')) {
          setMessage('This confirmation link has expired. Please request a new one.');
        } else if (error.message.includes('already been used')) {
          setMessage('This email has already been confirmed. You can now log in.');
          setTimeout(() => navigate('/auth'), 2000);
        } else {
          setMessage(error.message || 'Failed to confirm email. Please try again.');
        }
      } else {
        setStatus('success');
        setMessage('Email confirmed successfully! Redirecting to your dashboard...');
      }
    } catch (error) {
      console.error('Verification error:', error);
      setStatus('error');
      setMessage('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-8 shadow-2xl">
          <div className="flex flex-col items-center text-center space-y-6">
            {status === 'loading' && (
              <>
                <Loader2 className="h-16 w-16 text-primary animate-spin" />
                <h1 className="text-2xl font-bold text-foreground">Confirming your email...</h1>
                <p className="text-muted-foreground">Please wait while we verify your account</p>
              </>
            )}

            {status === 'success' && (
              <>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                >
                  <CheckCircle2 className="h-16 w-16 text-green-500" />
                </motion.div>
                <h1 className="text-2xl font-bold text-foreground">Email Confirmed! 🎉</h1>
                <p className="text-muted-foreground">{message}</p>
                <div className="w-full bg-secondary/20 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="h-full bg-primary"
                    initial={{ width: '100%' }}
                    animate={{ width: '0%' }}
                    transition={{ duration: 3, ease: 'linear' }}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Redirecting in {countdown} second{countdown !== 1 ? 's' : ''}...
                </p>
                <Button onClick={() => navigate('/app/dashboard')} className="w-full">
                  Continue to Dashboard
                </Button>
              </>
            )}

            {status === 'error' && (
              <>
                <XCircle className="h-16 w-16 text-destructive" />
                <h1 className="text-2xl font-bold text-foreground">Confirmation Failed</h1>
                <p className="text-muted-foreground">{message}</p>
                <div className="flex flex-col gap-3 w-full">
                  <Button onClick={() => navigate('/auth')} className="w-full">
                    Go to Login
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate('/auth/resend')}
                    className="w-full"
                  >
                    Resend Confirmation Email
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ConfirmEmail;
