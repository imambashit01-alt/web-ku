export const loginUser = async (email, password) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: 'dummy-token-123',
        user: { id: 1, email, name: 'User Name' }
      });
    }, 1000);
  });
};

export const registerUser = async (email, password, name) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: 'dummy-token-456',
        user: { id: 2, email, name }
      });
    }, 1000);
  });
};

export const loginWithGoogle = async (credential) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: 'dummy-google-token-789',
        user: { id: 3, email: 'google@example.com', name: 'Google User' }
      });
    }, 1000);
  });
};

export const verifyToken = async (token) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ valid: true, user: { id: 1, email: 'user@example.com', name: 'User Name' } });
    }, 500);
  });
};
