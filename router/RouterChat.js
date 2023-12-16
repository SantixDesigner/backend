import express from 'express';

async function controladorTenerChat(req, res) {
    const id = req.params.id
    res.render('chat', { id })
}

export const RouterChat = express();
const main = async () => {
    RouterChat.get('/api/productos/chat/:id', controladorTenerChat)
}
main()
