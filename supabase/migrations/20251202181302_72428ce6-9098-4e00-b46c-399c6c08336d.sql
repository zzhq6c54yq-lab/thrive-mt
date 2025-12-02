-- Update life transition programs with missing cover images
UPDATE life_transition_programs 
SET cover_image_url = 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80'
WHERE slug = 'job-loss';

UPDATE life_transition_programs 
SET cover_image_url = 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&q=80'
WHERE slug = 'grief-healing';