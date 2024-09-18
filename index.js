const COHORT = "2408-FTB-ET-WEB-FT";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/artists`;

// === State ===

const state = {
	artists: [],
};

/** Updates state with artists from API */
async function getArtists() {
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
		console.log("fn: getArtists: Failed to fetch Artists", error);
	}
}

/** Asks the API to create a new artist based on the given `artist` */
async function addArtist(artist) {
	// TODO
}

// === Render ===

/** Renders artists from state */
function renderArtists() {
	// TODO
}

/** Syncs state with the API and rerender */
async function render() {
	await getArtists();
	renderArtists();
}

// === Script ===

render();

// TODO: Add artist with form data when the form is submitted
