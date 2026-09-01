import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, LockKeyhole, Mail } from "lucide-react";
import { authService } from "../services/authService";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    setError("");
    try {
      await authService.login(form);
      navigate("/dashboard");
    } catch {
      setError("Login failed. If authentication is not implemented yet, use the dashboard directly or change the endpoint in authService.js.");
    }
  }

  return (
    <div className="login-page">
      <div className="login-brand"><div className="brand-icon"><ShieldCheck size={28}/></div><strong>SentinelCore</strong></div>
      <div className="login-card">
        <div className="login-heading"><div className="login-icon"><ShieldCheck size={28}/></div><h1>Welcome back</h1><p>Sign in to your security operations console.</p></div>
        {error && <div className="form-error">{error}</div>}
        <form onSubmit={submit}>
          <label>Username / Email<div className="input-icon"><Mail size={17}/><input required value={form.username} onChange={e => setForm({...form, username:e.target.value})} placeholder="admin@sentinelcore.com"/></div></label>
          <label>Password<div className="input-icon"><LockKeyhole size={17}/><input required type="password" value={form.password} onChange={e => setForm({...form, password:e.target.value})} placeholder="••••••••"/></div></label>
          <div className="login-options"><label className="checkbox"><input type="checkbox"/> Remember me</label><button type="button" className="link-btn">Forgot password?</button></div>
          <button className="btn primary full" type="submit">Sign In</button>
        </form>
      </div>
      <span className="login-footer">SentinelCore · Enterprise Security Operations Platform</span>
    </div>
  );
}