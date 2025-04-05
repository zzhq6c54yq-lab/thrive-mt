
export interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  avatar?: string;
  contactEmail?: string;
}

export interface SharedVideo {
  videoId: string;
  title: string;
  date: string;
  sharedWith: string[];
  viewCount: number;
  videoUrl: string;
  thumbnail: string;
}

// Mock data for family members
const familyMembers: FamilyMember[] = [
  { 
    id: "fam1", 
    name: "Sarah Johnson", 
    relation: "Mother", 
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
    contactEmail: "sarah.j@example.com" 
  },
  { 
    id: "fam2", 
    name: "Robert Johnson", 
    relation: "Father", 
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
    contactEmail: "robert.j@example.com" 
  },
  { 
    id: "fam3", 
    name: "Emily Thompson", 
    relation: "Sister", 
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
    contactEmail: "emily.t@example.com" 
  },
  { 
    id: "fam4", 
    name: "Michael Johnson", 
    relation: "Brother", 
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    contactEmail: "michael.j@example.com" 
  },
  { 
    id: "fam5", 
    name: "Dr. Rachel Williams", 
    relation: "Therapist", 
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=300&q=80",
    contactEmail: "dr.williams@example.com" 
  }
];

// Mock data for shared videos
const sharedVideos: SharedVideo[] = [
  {
    videoId: "sv1",
    title: "Weekly Update for Mom",
    date: "April 3, 2025",
    sharedWith: ["fam1"],
    viewCount: 2,
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-under-multicolored-lights-32715-large.mp4",
    thumbnail: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80"
  },
  {
    videoId: "sv2",
    title: "Therapy Progress Report",
    date: "March 29, 2025",
    sharedWith: ["fam5"],
    viewCount: 1,
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-young-woman-sitting-on-the-floor-and-meditating-42424-large.mp4",
    thumbnail: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&w=300&q=80"
  }
];

// Get all family members
export const getAllFamilyMembers = (): FamilyMember[] => {
  return [...familyMembers];
};

// Get shared videos
export const getSharedVideos = (): SharedVideo[] => {
  return [...sharedVideos];
};

// Share video with family members
export const shareVideo = (videoId: string, title: string, familyMemberIds: string[], videoUrl: string, thumbnail: string): SharedVideo => {
  const newSharedVideo: SharedVideo = {
    videoId,
    title,
    date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    sharedWith: familyMemberIds,
    viewCount: 0,
    videoUrl,
    thumbnail
  };
  
  sharedVideos.push(newSharedVideo);
  return newSharedVideo;
};

// Update shared video
export const updateSharedVideo = (videoId: string, updates: Partial<SharedVideo>): SharedVideo | null => {
  const videoIndex = sharedVideos.findIndex(v => v.videoId === videoId);
  
  if (videoIndex === -1) {
    return null;
  }
  
  sharedVideos[videoIndex] = { ...sharedVideos[videoIndex], ...updates };
  return sharedVideos[videoIndex];
};

// Remove share
export const removeSharedVideo = (videoId: string): boolean => {
  const initialLength = sharedVideos.length;
  const newSharedVideos = sharedVideos.filter(v => v.videoId !== videoId);
  
  if (newSharedVideos.length < initialLength) {
    sharedVideos.length = 0;
    sharedVideos.push(...newSharedVideos);
    return true;
  }
  
  return false;
};

// Add family member
export const addFamilyMember = (name: string, relation: string, contactEmail?: string, avatar?: string): FamilyMember => {
  const newMember: FamilyMember = {
    id: `fam${Date.now()}`,
    name,
    relation,
    contactEmail,
    avatar
  };
  
  familyMembers.push(newMember);
  return newMember;
};

// Remove family member
export const removeFamilyMember = (id: string): boolean => {
  const initialLength = familyMembers.length;
  const newFamilyMembers = familyMembers.filter(m => m.id !== id);
  
  if (newFamilyMembers.length < initialLength) {
    familyMembers.length = 0;
    familyMembers.push(...newFamilyMembers);
    return true;
  }
  
  return false;
};

// Get family member by ID
export const getFamilyMemberById = (id: string): FamilyMember | undefined => {
  return familyMembers.find(m => m.id === id);
};

// Get shared videos for a specific family member
export const getSharedVideosForMember = (memberId: string): SharedVideo[] => {
  return sharedVideos.filter(v => v.sharedWith.includes(memberId));
};
