import { describe, it, expect, beforeEach, vi } from "vitest";
import { Context } from "hono";
import * as authController from "../../controllers/authController";
import bcrypt from "bcryptjs";
import { sign } from "hono/jwt";

vi.mock("bcryptjs", () => ({
  default: {
    hash: vi.fn(),
    compare: vi.fn(),
  },
}));

vi.mock("hono/jwt", () => ({
  sign: vi.fn(),
}));

const mockBcryptHash = bcrypt.hash as unknown as ReturnType<typeof vi.fn>;
const mockBcryptCompare = bcrypt.compare as unknown as ReturnType<typeof vi.fn>;
const mockSign = sign as unknown as ReturnType<typeof vi.fn>;

const mockContext = (
  body: Record<string, unknown> = {},
  utilisateurExistant: unknown = null,
  path = "/auth/test"
) => {
  const first = vi.fn().mockResolvedValue(utilisateurExistant);

  const run = vi.fn().mockResolvedValue({
    meta: {
      last_row_id: 1,
    },
  });

  const bind = vi.fn().mockReturnValue({
    first,
    run,
  });

  const prepare = vi.fn().mockReturnValue({
    bind,
  });

  return {
    req: {
      path,
      json: vi.fn().mockResolvedValue(body),
    },
    env: {
      DB: {
        prepare,
      },
      SECRET_JWT: "test-secret",
    },
    json: vi.fn((obj, status) => ({
      statusCode: status,
      body: obj,
    })),
  };
};

beforeEach(() => {
  vi.clearAllMocks();
});

/* ---------- SIGNUP ---------- */
describe("authController.signup", () => {
  it("400 si champs manquants", async () => {
    const context = mockContext({
      prenom: "Fred",
      nom: "Blouin",
      courriel: "fred@test.com",
      motDePasse: "Password123!",
    });

    const response = await authController.signup(context as unknown as Context);

    expect(response.statusCode).toBe(400);
    expect(response.body).toMatchObject({
      status: 400,
      error: "Bad Request",
      message: "Un des paramètres est manquant",
      path: "/auth/test",
    });
  });

  it("422 si les mots de passe ne correspondent pas", async () => {
    const context = mockContext({
      prenom: "Fred",
      nom: "Blouin",
      courriel: "fred@test.com",
      motDePasse: "Password123!",
      motDePasseConfirmation: "Different123!",
    });

    const response = await authController.signup(context as unknown as Context);

    expect(response.statusCode).toBe(422);
    expect(response.body.message).toBe(
      "Le mot de passe est différent de celui en confirmation"
    );
  });

  it("409 si utilisateur existe déjà", async () => {
    const context = mockContext(
      {
        prenom: "Fred",
        nom: "Blouin",
        courriel: "fred@test.com",
        motDePasse: "Password123!",
        motDePasseConfirmation: "Password123!",
      },
      {
        id: 1,
        courriel: "fred@test.com",
      }
    );

    const response = await authController.signup(context as unknown as Context);

    expect(response.statusCode).toBe(409);
    expect(response.body.message).toBe("Un utilisateur a déjà ce courriel");
  });

  it("201 si utilisateur créé avec succès", async () => {
    mockBcryptHash.mockResolvedValue("hashed-password");

    const context = mockContext({
      prenom: "Fred",
      nom: "Blouin",
      courriel: "fred@test.com",
      motDePasse: "Password123!",
      motDePasseConfirmation: "Password123!",
    });

    const response = await authController.signup(context as unknown as Context);

    expect(mockBcryptHash).toHaveBeenCalledWith("Password123!", 12);
    expect(response.statusCode).toBe(201);
    expect(response.body).toMatchObject({
      status: 201,
      message: "Utilisateur ajouté avec succès!",
      path: "/auth/test",
    });
    expect(response.body.data).toMatchObject({
      id: 1,
      prenom: "Fred",
      nom: "Blouin",
      courriel: "fred@test.com",
    });
  });
});

/* ---------- LOGIN ---------- */
describe("authController.login", () => {
  it("400 si champs manquants", async () => {
    const context = mockContext({
      courriel: "fred@test.com",
    });

    const response = await authController.login(context as unknown as Context);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Un des paramètres est manquant");
  });

  it("401 si utilisateur introuvable", async () => {
    const context = mockContext({
      courriel: "fred@test.com",
      motDePasse: "Password123!",
    });

    const response = await authController.login(context as unknown as Context);

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Courriel ou mot de passe invalide");
  });

  it("401 si mot de passe invalide", async () => {
    mockBcryptCompare.mockResolvedValue(false);

    const context = mockContext(
      {
        courriel: "fred@test.com",
        motDePasse: "Wrong123!",
      },
      {
        id: 1,
        prenom: "Fred",
        nom: "Blouin",
        courriel: "fred@test.com",
        motDePasse: "hashed-password",
      }
    );

    const response = await authController.login(context as unknown as Context);

    expect(mockBcryptCompare).toHaveBeenCalledWith(
      "Wrong123!",
      "hashed-password"
    );
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Courriel ou mot de passe invalide");
  });

  it("200 si connexion réussie", async () => {
    mockBcryptCompare.mockResolvedValue(true);
    mockSign.mockResolvedValue("fake.jwt.token");

    const context = mockContext(
      {
        courriel: "fred@test.com",
        motDePasse: "Password123!",
      },
      {
        id: 1,
        prenom: "Fred",
        nom: "Blouin",
        courriel: "fred@test.com",
        motDePasse: "hashed-password",
      }
    );

    const response = await authController.login(context as unknown as Context);

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject({
      status: 200,
      message: "Connexion réussie",
      path: "/auth/test",
    });
    expect(response.body.data.token).toBe("fake.jwt.token");
  });
});