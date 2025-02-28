import roomsData from "@/data/rooms.js";

export default function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const room = roomsData.find(room => room.id === parseInt(id, 10));
    if (room) {
      res.status(200).json(room);
    } else {
      res.status(404).json({ message: 'Room not found' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}