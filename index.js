// for testing (perhaps not-so-accidental?)
import fetch from "node-fetch";

const COHORT = "2408-FTB-ET-WEB-FT";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/artists/`;

// #region STATE

const state = {
	artists: [],
	results: {
		get: [],
		put: [],
		post: [],
		delete: [],
	},
};

/** Updates state with artists from API */
async function get_artists() {
	try {
		const response = await fetch(API_URL);

		if (!response.ok) {
			throw new Error(`URL Error: ${response.status} ${response.statusText}`);
		}

		// expect an array here? (or some kind of object)
		const result = await response.json();

		if (!result.success) {
			// do something on error, do not overwrite state
			throw new Error(`API Error: ${result.error || "Unknown error"}`);
		}

		if (!Array.isArray(result.data)) {
			throw new Error(`API Error: Unexpected data format: Expected an Array`);
		}

		state.artists = result.data;
	} catch (error) {
		console.error("Error: get_artists:", error);
	}
}

/** Asks the API to create a new artist based on the given `artist` */
/**
 * @param {Object} artist
 */
async function add_artist(artist) {
	// TODO -- we need to utilize a POST request
	try {
		const response = await fetch(API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(artist),
		}); // await returns the value of the Promise

		if (!response.ok) {
			throw new Error(`URL Error: ${response.status} ${response.statusText}`);
		}

		const result = await response.json();

		if (result.error) {
			throw new Error(`API Error: ${result.error.message || "Unknown error"}`);
		}

		//console.log("Artist add operation completed successfully", result.data);
		state.results.post.push(result);
		return result.data;
	} catch (error) {
		console.error("Error: add_artist:", error);
		return null;
	}
}

// #region RENDER

/** Renders artists from state */
function $render_artists() {
	// TODO
}

/** Syncs state with the API and rerender */
async function render() {
	await get_artists();
	$render_artists();
}

// #region SCRIPT

render();

// TODO: Add artist with form data when the form is submitted

// #region TEST
if (true) {
	const new_artist = {
		name: "Santiago",
		description: "A melody of guitar love from beyond the border.",
		imageURL: "https://loremflickr.com/320/240/song,musician?q=5",
	};

	//add_artist(new_artist)
	add_artist({})
		.then((result) => {
			if (result) {
				console.log("Artist added:", result);
			} else {
				console.log("Failed to add artist");
			}
		})
		.catch((error) => console.error("Unexpected error:", error));
}
