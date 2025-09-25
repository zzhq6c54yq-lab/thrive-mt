
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import { toast as toastFunction } from "@/hooks/use-toast";

/**
 * Downloads a worksheet PDF for the specified workshop ID
 * @param workshopId - The ID of the workshop
 * @param toastParam - The toast function or object containing toast function
 */
export const downloadWorksheet = (workshopId: string, toastParam?: any) => {
  // Create a new PDF document
  const doc = new jsPDF();
  
  // Get the worksheet content based on workshop ID
  const content = getWorksheetContent(workshopId);
  
  // Set up initial position
  let yPosition = 20;
  
  // Add header with logo placeholder
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text("THRIVE", 105, yPosition, { align: 'center' });
  yPosition += 7;
  doc.setFontSize(16);
  doc.text("Mental Wellness Platform", 105, yPosition, { align: 'center' });
  yPosition += 15;
  
  // Add workshop title
  doc.setFontSize(18);
  doc.text(content.title, 105, yPosition, { align: 'center' });
  yPosition += 7;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'italic');
  doc.text(content.subtitle, 105, yPosition, { align: 'center' });
  yPosition += 20;
  
  // Add introduction
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  
  // Split text into multiple lines
  const introLines = doc.splitTextToSize(content.introduction, 170);
  doc.text(introLines, 20, yPosition);
  yPosition += introLines.length * 7;
  
  // Add sections
  content.sections.forEach((section, index) => {
    yPosition += 10;
    
    // Add section title
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(`${index + 1}. ${section.title}`, 20, yPosition);
    yPosition += 10;
    
    // Add section description
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    const descLines = doc.splitTextToSize(section.description, 170);
    doc.text(descLines, 20, yPosition);
    yPosition += descLines.length * 6 + 5;
    
    // Add exercises
    section.exercises.forEach((exercise, exIndex) => {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(`Exercise ${index + 1}.${exIndex + 1}: ${exercise.title}`, 25, yPosition);
      yPosition += 7;
      
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      const instructionLines = doc.splitTextToSize(exercise.instructions, 165);
      doc.text(instructionLines, 25, yPosition);
      yPosition += instructionLines.length * 6 + 5;
      
      // Add prompt and space for answers
      exercise.prompts.forEach(prompt => {
        const promptText = doc.splitTextToSize(`• ${prompt}`, 165);
        doc.text(promptText, 25, yPosition);
        yPosition += promptText.length * 6;
        
        doc.setDrawColor(200);
        doc.line(20, yPosition, 190, yPosition);
        yPosition += 8;
        doc.line(20, yPosition, 190, yPosition);
        yPosition += 8;
        doc.line(20, yPosition, 190, yPosition);
        yPosition += 15;
      });
    });
  });
  
  // Add commitment section
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text("My Commitment", 20, yPosition);
  yPosition += 8;
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text("I commit to implementing these practices because:", 20, yPosition);
  yPosition += 8;
  
  doc.setDrawColor(200);
  doc.line(20, yPosition, 190, yPosition);
  yPosition += 8;
  doc.line(20, yPosition, 190, yPosition);
  yPosition += 8;
  
  // Signature line
  yPosition += 15;
  doc.text("Signature: _______________________     Date: _____________", 20, yPosition);
  
  // Save the PDF with workshop title
  try {
    const blob = doc.output('blob');
    const fileName = `${content.title.replace(/\s+/g, '_')}.pdf`;
    console.log('Attempting to download:', fileName, 'Blob size:', blob.size);
    
    // Fallback download method if file-saver doesn't work
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    console.log('Download triggered successfully');
  } catch (error) {
    console.error('Download failed:', error);
    
    // Show error toast
    if (toastParam) {
      const toastFn = typeof toastParam === 'function' ? toastParam : 
                     typeof toastParam.toast === 'function' ? toastParam.toast : 
                     toastFunction;
      toastFn({
        title: "Download Failed",
        description: "There was an error downloading the worksheet. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    }
    return;
  }
  
  // Show success toast - correctly handle the toast function
  if (toastParam) {
    // Direct toast function
    if (typeof toastParam === 'function') {
      toastParam({
        title: "Worksheet Downloaded",
        description: "Your worksheet has been downloaded successfully.",
        duration: 5000,
      });
    } 
    // Object with toast method
    else if (typeof toastParam.toast === 'function') {
      toastParam.toast({
        title: "Worksheet Downloaded",
        description: "Your worksheet has been downloaded successfully.",
        duration: 5000,
      });
    }
    // Default to global toast if available
    else {
      toastFunction({
        title: "Worksheet Downloaded",
        description: "Your worksheet has been downloaded successfully.",
        duration: 5000,
      });
    }
  }
};

// Helper function to get worksheet content based on workshop ID
const getWorksheetContent = (workshopId: string) => {
  // Default content structure
  const defaultContent = {
    title: "Mental Wellness Worksheet",
    subtitle: "Tools and exercises for your wellness journey",
    introduction: "This worksheet is designed to help you practice and integrate the concepts covered in this workshop. Take your time with each exercise and remember that self-reflection is a powerful tool for growth.",
    sections: [
      {
        title: "Understanding Your Patterns",
        description: "Identifying patterns in thoughts, emotions, and behaviors is the first step toward positive change.",
        exercises: [
          {
            title: "Self-Reflection Exercise",
            instructions: "Take a moment to reflect on your patterns related to this topic. Consider how these patterns have affected your life.",
            prompts: [
              "What patterns have you noticed in your thoughts or behaviors?",
              "How have these patterns affected your daily life and relationships?",
              "What triggers do you notice that reinforce these patterns?"
            ]
          }
        ]
      },
      {
        title: "Practical Strategies",
        description: "Learning and applying specific techniques can help you develop new habits and responses.",
        exercises: [
          {
            title: "Implementation Planning",
            instructions: "Plan how you will implement the strategies discussed in the workshop.",
            prompts: [
              "Which strategy resonated with you the most and why?",
              "How will you incorporate this strategy into your daily routine?",
              "What obstacles might you face, and how will you overcome them?"
            ]
          }
        ]
      }
    ]
  };
  
  // Workshop-specific content mappings
  const contentMap: {[key: string]: any} = {
    'mindful-communication': {
      title: "Mindful Communication Worksheet",
      subtitle: "Developing presence and intention in your interactions",
      introduction: "This worksheet will help you develop more mindful communication habits. The exercises are designed to increase your awareness of how you communicate and provide tools to make your interactions more intentional and effective.",
      sections: [
        {
          title: "Communication Awareness",
          description: "Before changing communication patterns, it's important to become aware of your current habits.",
          exercises: [
            {
              title: "Communication Self-Assessment",
              instructions: "Reflect on your typical communication patterns in different contexts.",
              prompts: [
                "How do you typically communicate when you're feeling stressed or rushed?",
                "In what situations do you find communication most challenging?",
                "How do you think others perceive your communication style?"
              ]
            }
          ]
        },
        {
          title: "Active Listening Practice",
          description: "Active listening is a cornerstone of mindful communication.",
          exercises: [
            {
              title: "Listening Without Planning Your Response",
              instructions: "Practice truly focusing on what others are saying without mentally preparing your reply.",
              prompts: [
                "What makes it difficult for you to listen fully without planning your response?",
                "How does the conversation feel different when you focus entirely on listening?",
                "What did you notice about your conversation partner when you practiced active listening?"
              ]
            }
          ]
        }
      ]
    },
    'emotional-regulation': {
      title: "Emotional Regulation Worksheet",
      subtitle: "Tools for understanding and managing your emotions",
      introduction: "This worksheet provides a framework for developing your emotional regulation skills. Through these exercises, you'll gain a better understanding of your emotional patterns and learn techniques to respond to your emotions in healthier ways.",
      sections: [
        {
          title: "Emotion Awareness",
          description: "Recognizing and naming emotions is the first step toward regulating them effectively.",
          exercises: [
            {
              title: "Emotion Tracking",
              instructions: "Practice identifying your emotions throughout the day.",
              prompts: [
                "What emotions do you experience most frequently?",
                "Where do you feel different emotions in your body?",
                "How quickly do your emotions tend to change or intensify?"
              ]
            }
          ]
        },
        {
          title: "Regulation Strategies",
          description: "Different situations call for different emotion regulation approaches.",
          exercises: [
            {
              title: "Creating Your Regulation Toolkit",
              instructions: "Develop a personalized set of strategies for managing difficult emotions.",
              prompts: [
                "What helps you calm down when you're feeling overwhelmed?",
                "Which mindfulness techniques work best for you in emotional situations?",
                "How can you create space between feeling an emotion and acting on it?"
              ]
            }
          ]
        }
      ]
    },
    // You can add more workshop-specific content mappings as needed
    'stress-management': {
      title: "Stress Management Worksheet",
      subtitle: "Practical techniques for managing stress",
      introduction: "This worksheet will help you develop effective strategies for managing stress in your daily life. By completing these exercises, you'll create a personalized approach to stress reduction that works for your unique circumstances.",
      sections: [
        {
          title: "Stress Awareness",
          description: "Understanding your stress patterns is essential for effective management.",
          exercises: [
            {
              title: "Stress Inventory",
              instructions: "Identify your major sources of stress and how they affect you.",
              prompts: [
                "What situations, people, or thoughts trigger stress for you?",
                "How does your body respond when you're under stress?",
                "What patterns do you notice in how you typically cope with stress?"
              ]
            }
          ]
        },
        {
          title: "Stress Reduction Techniques",
          description: "Different techniques work for different people and situations.",
          exercises: [
            {
              title: "Building Your Stress Management Plan",
              instructions: "Create a practical plan for managing stress in various situations.",
              prompts: [
                "Which quick stress-relief techniques work best for you in the moment?",
                "What longer-term practices could you incorporate into your routine?",
                "How will you remind yourself to use these techniques when stress arises?"
              ]
            }
          ]
        }
      ]
    }
  };
  
  // Return workshop-specific content if available, otherwise return default
  return contentMap[workshopId] || defaultContent;
};
