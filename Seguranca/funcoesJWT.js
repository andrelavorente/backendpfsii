import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export function assinar(usuario) {
  const token = jwt.sign({ usuario }, process.env.SEGREDO, {
    expiresIn: "300s",
  });
  return token;
}

export function verificarAssinatura(token) {
  return jwt.verify(token, process.env.SEGREDO);
}
