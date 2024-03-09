// pages/_app.js
import "../styles/globals.css";
import NavBar from "../components/NavBar"; // Adjust the path as necessary

function MyApp({ Component, pageProps }) {
	return (
		<div>
			<NavBar />
			<Component {...pageProps} />
		</div>
	);
}

export default MyApp;
