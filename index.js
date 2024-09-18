const COHORT = "2408-FTB-ET-WEB-FT";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/artists`;

// === State ===

const state = {
	artists: [],
};

/** Updates state with artists from API */
async function getArtists() {
	// TODO
	const response = await fetch(API_URL);

	if (!response.ok) {
		throw new Error(
			`fn: getArtists: Error: ${response.status} ${response.statusText}`
		);
	}

	// expect an array here? (or some kind of object)
	const result = await response.json();

	if (!result.success) {
		throw new Error(`getArtists: API Error: ${result.error || "Unknown error"}`);
	}

	if (!Array.isArray(result.data)) {
		throw new Error(`getArtists: API Error: Unexpected data format: Expected an Array`);
	}

	if (result.error) {
		// do something on error, do not overwrite state
	} else if (Array.isArray(result.data)) {
		state.artists = result.data;
	} else
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
