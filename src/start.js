import { createStart } from "@tanstack/react-start";
import { authMiddleware, base44RequestMiddleware } from "@/lib/auth-middleware";

export const startInstance = createStart(() => ({
  requestMiddleware: [base44RequestMiddleware],
  functionMiddleware: [authMiddleware],
}));
