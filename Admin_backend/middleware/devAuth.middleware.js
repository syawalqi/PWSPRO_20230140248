import jwt from "jsonwebtoken";

export const verifyDeveloper = (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth) {
    return res.status(401).json({ message: "Missing token" });
  }

  const token = auth.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "developer" && decoded.role !== "user") {
      return res.status(403).json({ message: "Forbidden" });
    }

    req.developer = decoded;
    next();
  } catch {
    res.status(403).json({ message: "Invalid token" });
  }
};
