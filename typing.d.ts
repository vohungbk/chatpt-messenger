interface Message {
  text: string
  createdAT: admin.firestore.Timestamp
  user: {
    _id: string
    name: string
    avatar: string
  }
}
