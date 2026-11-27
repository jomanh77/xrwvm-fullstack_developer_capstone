import { useState } from 'react';
import './Register.css';

export default function Register() {
  const [message, setMessage] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget));
    setMessage('');
    try {
      const response = await fetch('/djangoapp/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const result = await response.json();
      setMessage(response.ok && result.status === 'Authenticated'
        ? 'Registration successful.'
        : result.error || 'Registration could not be completed.');
    } catch {
      setMessage('Registration could not be completed.');
    }
  }

  return (
    <main className="register_container">
      <h1 className="header">Sign-up</h1>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <label>Username <input className="input_field" name="userName" autoComplete="username" required /></label>
          <label>First Name <input className="input_field" name="firstName" autoComplete="given-name" required /></label>
          <label>Last Name <input className="input_field" name="lastName" autoComplete="family-name" required /></label>
          <label>Email <input className="input_field" name="email" type="email" autoComplete="email" required /></label>
          <label>Password <input className="input_field" name="password" type="password" autoComplete="new-password" required /></label>
        </div>
        <div className="submit_panel">
          <button className="submit" type="submit">Register</button>
        </div>
        {message && <p role="status">{message}</p>}
      </form>
    </main>
  );
}
