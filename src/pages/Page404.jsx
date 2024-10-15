export default function Page404() {
  const params = window.location.pathname;

  return (
    <main>
      <h2>Error 404</h2>
      <h3>{`La página "${params}" no existe.`}</h3>
      <img src="/this-is-fine-404.gif" alt="No se encuentra la página" />
    </main>
  );
}
