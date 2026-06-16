// Mock Contact Service
// Handles contact messages submission to support backend integration later.

const DELAY = 600;

export const contactService = {
  submitContactForm: async (formData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!formData.name || !formData.email || !formData.message) {
          reject(new Error('All fields are required.'));
          return;
        }

        console.log('Mock Contact Form Submission Received:', formData);
        resolve({ success: true, message: 'Message sent successfully! We will get back to you soon.' });
      }, DELAY);
    });
  }
};
