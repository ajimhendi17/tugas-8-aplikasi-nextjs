let notes = [];
let idCounter = 1;

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(notes);
  } else if (req.method === 'POST') {
    const { title, amount } = req.body;
    const newNote = { id: idCounter++, title, amount };
    notes.push(newNote);
    res.status(201).json(newNote);
  } else {
    res.status(405).end();
  }
}