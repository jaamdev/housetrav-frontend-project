import useAuth from '#Hooks/useAuth.js';

export default function Display() {
  const {
    state: {
      display: { success, errors },
    },
  } = useAuth();

  if ((!success || success.length === 0) && (!errors || errors.length === 0)) {
    return null;
  }

  return (
    <ul className="display-ctn">
      {success &&
        success.length > 0 &&
        success.map((msg, idx) => (
          <li className="success" key={idx}>
            ✅ {msg}
          </li>
        ))}
      {errors &&
        errors.length > 0 &&
        errors.map((err, idx) => (
          <li className="error" key={idx}>
            ❌ {err}
          </li>
        ))}
    </ul>
  );
}
