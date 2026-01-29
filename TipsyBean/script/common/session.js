/**
 * Session Management Module
 * Handles user authentication state across the entire website
 * Persists login state until user explicitly logs out
 */

class SessionManager {
  constructor() {
    this.SESSION_KEY = 'userSession';
    this.initializeSession();
  }

  /**
   * Initialize session on page load
   */
  initializeSession() {
    const session = this.getSession();
    if (!session || !session.isAuthenticated) {
      this.clearSession();
    }
  }

  /**
   * Create a new login session
   */
  createSession(email, firstName = '', lastName = '') {
    const session = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      loginTime: new Date().toISOString(),
      isAuthenticated: true
    };
    sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
    return session;
  }

  /**
   * Get current session
   */
  getSession() {
    const session = sessionStorage.getItem(this.SESSION_KEY);
    return session ? JSON.parse(session) : null;
  }

  /**
   * Check if user is logged in
   */
  isLoggedIn() {
    const session = this.getSession();
    return session && session.isAuthenticated === true;
  }

  /**
   * Get current user email
   */
  getUserEmail() {
    const session = this.getSession();
    return session ? session.email : null;
  }

  /**
   * Update session with profile data
   */
  updateSession(firstName, lastName) {
    const session = this.getSession();
    if (session) {
      session.firstName = firstName;
      session.lastName = lastName;
      sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
    }
  }

  /**
   * Logout - clear session
   */
  logout() {
    sessionStorage.removeItem(this.SESSION_KEY);
  }

  /**
   * Clear session completely
   */
  clearSession() {
    sessionStorage.removeItem(this.SESSION_KEY);
  }

  /**
   * Check if user has access to protected page
   * Redirects to login if not authenticated
   */
  requireLogin(redirectPath = './login.html') {
    if (!this.isLoggedIn()) {
      window.location.href = redirectPath;
      return false;
    }
    return true;
  }
}

// Global session manager instance
const sessionManager = new SessionManager();
