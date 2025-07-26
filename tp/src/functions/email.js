const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function e_mail(event) {
  event.preventDefault();

  const email = document.getElementById('email')?.value;

  if (!email) {
    console.error('E-mail não fornecido.');
    return;
  }

  try {
    console.log(email)
    const response = await fetch(`${API_URL}/api/auth/sendEmail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ to: email}),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('E-mail enviado com sucesso:', data);
      window.location.href = "/";
    } else {
      console.error('Erro ao enviar e-mail:', data.message || data);
    }
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
  }
}