const express = require('express');
const { exec } = require('child_process');
const app = express();

app.use(express.json());

// Endpoint untuk menerima webhook
app.post('/webhook', (req, res) => {
	// Log payload untuk debugging
	console.log('Payload received:', req.body);

	console.log('Ref:', req.body.ref);

	// Periksa apakah event yang diterima adalah push
	if (req.body.ref === 'refs/heads/main') { // Ganti 'master' dengan 'main' jika branch Anda adalah main
		// Jalankan perintah git pull
		exec('git pull origin main', { cwd: 'D:/DEVELOPMENT/yg-clone-tolol' }, (error, stdout, stderr) => {
			if (error) {
				console.error(`exec error: ${error}`);
				return res.status(500).send('Error pulling repository');
			}
			console.log(`stdout: ${stdout}`);
			console.log(`stderr: ${stderr}`);
			return res.send('Repository updated'); ''
		});
	} else {
		console.log('Event not handled: ', req.body.ref);
		return res.status(400).send('Event not handled');
	}
});

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
