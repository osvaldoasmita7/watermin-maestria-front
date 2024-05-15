import jwt from "jsonwebtoken";

export const verifyJWT2 = (token = "") => {
  try {
    if (!token) return [false, null];
    token = token.substring(1);
    token = token.substring(0, token.length - 1);
    if (!token) return [false, null, null, []];

    const { userId, rolId, cedis, negocio_id } = jwt.verify(
      token,
      process.env.REACT_APP_JWT_KEY
    );

    return { ok: true, userId, rolId, cedis, negocio_id };
  } catch (error) {
    return {
      ok: false,
      userId: null,
      rolId: null,
    };
  }
};
