import jwt from "jsonwebtoken";

export const createTokenAndSaveKookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.jwt_token, {
    expiresIn: "10d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
};
