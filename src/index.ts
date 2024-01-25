import App from './app';
import 'dotenv/config';

const app = new App();

app.initializeAdapters()
	.then(() => app.getServer().listen(process.env.SERVER_PORT));