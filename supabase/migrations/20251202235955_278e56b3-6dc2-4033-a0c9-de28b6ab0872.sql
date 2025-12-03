-- Update Dr. Damien Pena to Dr. Chris Hopkins
UPDATE therapists 
SET 
  name = 'Dr. Chris Hopkins',
  bio = 'Dr. Chris Hopkins is a licensed clinical psychologist with over 15 years of experience specializing in evidence-based therapy. He is dedicated to providing compassionate, personalized care that empowers clients to achieve lasting mental wellness.',
  image_url = 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80'
WHERE name ILIKE '%Damien Pena%';

-- Also update any profiles with Dr. Damien Pena display name
UPDATE profiles 
SET display_name = 'Dr. Chris Hopkins'
WHERE display_name ILIKE '%Damien Pena%';