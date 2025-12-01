// Mapping configuration for career coaching routes

export const moduleRoutes: Record<string, string> = {
  "Career Development Planning": "/app/career-coaching/module/career-development",
  "Leadership Skills": "/app/career-coaching/module/leadership-skills",
  "Resume & Interview Prep": "/app/career-coaching/module/resume-building",
  "Goal Setting & Achievement": "/app/career-coaching/module/goal-setting",
};

export const courseRoutes: Record<string, string> = {
  "Leadership Fundamentals": "/app/career-coaching/course/leadership-fundamentals",
  "Strategic Communication": "/app/career-coaching/course/strategic-communication",
  "Remote Team Management": "/app/career-coaching/course/remote-team-management",
};

export const resourceRoutes: Record<string, string> = {
  "Career Path Assessment": "/app/career-coaching/resource/career-assessment",
  "Resume Templates": "/app/career-coaching/resource/template-library",
  "Interview Simulator": "/app/career-coaching/resource/interview-simulator",
  "Goal Planning Worksheet": "/app/career-coaching/resource/goal-planner",
};

export const getModuleRoute = (title: string): string => {
  return moduleRoutes[title] || "/app/career-coaching";
};

export const getCourseRoute = (title: string): string => {
  return courseRoutes[title] || "/app/career-coaching";
};

export const getResourceRoute = (title: string): string => {
  return resourceRoutes[title] || "/app/career-coaching";
};
