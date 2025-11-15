-- Clean up the broken therapist demo user
DELETE FROM auth.users WHERE email = 'therapist@demo.com';