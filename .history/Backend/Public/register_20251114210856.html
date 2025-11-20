<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Library Register</title>
  <style>
    /* Simple styles to approximate the Tailwind look from your React component */
    :root{
      --bg:#f3f4f6; /* gray-100 */
      --card:#ffffff;
      --primary:#2563eb; /* blue-600 */
      --primary-hover:#1e40af;
      --danger:#dc2626;
      --text:#111827;
    }
    html,body{height:100%;margin:0;font-family:system-ui,-apple-system,Segoe UI,Roboto,"Helvetica Neue",Arial;}
    body{background:var(--bg);display:flex;align-items:center;justify-content:center;padding:24px;color:var(--text);}
    .card{background:var(--card);padding:32px;border-radius:12px;box-shadow:0 8px 24px rgba(0,0,0,0.08);width:100%;max-width:420px}
    h2{text-align:center;margin:0 0 18px;font-size:1.5rem}
    .field{margin-bottom:14px}
    label{display:block;margin-bottom:6px;font-weight:600;font-size:0.95rem}
    input[type="text"], input[type="email"], input[type="password"], select{
      width:100%;padding:10px;border:1px solid #d1d5db;border-radius:8px;font-size:0.95rem;box-sizing:border-box;
    }
    .btn{
      width:100%;padding:10px;border:0;border-radius:8px;background:var(--primary);color:#fff;font-weight:600;font-size:1rem;
      cursor:pointer;
    }
    .btn:hover{background:var(--primary-hover)}
    .message{margin-bottom:12px;padding:8px 10px;border-radius:8px;text-align:center;font-weight:600}
    .message.error{background:#fee2e2;color:var(--danger);border:1px solid #fecaca}
    .message.success{background:#ecfdf5;color:#065f46;border:1px solid #bbf7d0}
    small.hint{display:block;margin-top:6px;color:#6b7280;font-size:0.85rem}
  </style>
</head>
<body>
  <main class="card" role="main">
    <h2>Library Register</h2>

    <div id="messageContainer" aria-live="polite"></div>

    <form id="registerForm" novalidate>
      <div class="field">
        <label for="name">Full Name</label>
        <input id="name" name="name" type="text" placeholder="Enter your full name" autocomplete="name" required />
      </div>

      <div class="field">
        <label for="email">Email Address</label>
        <input id="email" name="email" type="email" placeholder="Enter your email" autocomplete="email" required />
      </div>

      <div class="field">
        <label for="password">Password</label>
        <input id="password" name="password" type="password" placeholder="Enter your password" autocomplete="new-password" required />
        <small class="hint">Use at least 6 characters.</small>
      </div>

      <div class="field">
        <label for="role">Choose Role</label>
        <select id="role" name="role" required aria-label="Select user role">
          <option value="">Select role</option>
          <option value="Admin">Admin</option>
          <option value="Librarian">Librarian</option>
          <option value="Student">Student</option>
        </select>
      </div>

      <button type="submit" class="btn">Register</button>
    </form>
  </main>

  <script>
    (function(){
      const form = document.getElementById('registerForm');
      const msgContainer = document.getElementById('messageContainer');

      function showMessage(text, type = 'error') {
        msgContainer.innerHTML = '';
        const p = document.createElement('div');
        p.className = 'message ' + (type === 'success' ? 'success' : 'error');
        p.textContent = text;
        msgContainer.appendChild(p);
      }

      function clearMessage() {
        msgContainer.innerHTML = '';
      }

      form.addEventListener('submit', async function (e) {
        e.preventDefault();
        clearMessage();

        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const password = form.password.value;
        const role = form.role.value;

        // Basic validation
        if (!name || !email || !password || !role) {
          showMessage('All fields are required!', 'error');
          return;
        }
        if (password.length < 6) {
          showMessage('Password must be at least 6 characters long.', 'error');
          return;
        }

        const payload = { name, email, password, role };

        try {
          // POST to backend - update URL if needed
          const res = await fetch('http://localhost:3002/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });

          if (!res.ok) {
            // attempt to parse error message from response
            let errText = 'Registration failed. Email may already exist.';
            try {
              const data = await res.json();
              if (data && data.message) errText = data.message;
            } catch (err) { /* ignore parse errors */ }
            throw new Error(errText);
          }

          // success
          showMessage('User registered successfully!', 'success');
          // reset form fields
          form.reset();
        } catch (err) {
          console.error(err);
          showMessage(err.message || 'Registration failed. Email may already exist.', 'error');
        }
      });
    })();
  </script>
</body>
</html>
