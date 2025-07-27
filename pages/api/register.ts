import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { name, email, password } = req.body

  try {
    const user = await prisma.user.create({
      data: { name, email, password },
    })
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({ error: "Email sudah terdaftar" })
  }
}